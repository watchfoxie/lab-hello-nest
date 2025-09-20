import {
  Injectable,
  BadRequestException,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  StudentsDto,
  StudentWithUniversityDto,
  StudentsCreateDto,
  StudentsUpdateDto,
  UniversityInfoDto,
} from './students.dto';
import { StudentEntity } from './student.entity';
import { UniversitiesService } from '../universities/universities.service';
//import { UniversityEntity } from '../universities/university.entity';
import { HTTP_STATUS_CODES } from '../../common/status-codes/http-status-codes';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentsRepository: Repository<StudentEntity>,
    private readonly universitiesService: UniversitiesService,
    private readonly dataSource: DataSource,
  ) {}

  // Alias pentru compatibilitate
  async students(): Promise<StudentWithUniversityDto[]> {
    return this.findAll();
  }

  async findAll(): Promise<StudentWithUniversityDto[]> {
    try {
      const students = await this.studentsRepository.find({
        relations: ['universitate'],
      });

      return students.map((student) => this.entityToDto(student));
    } catch (error) {
      this.logger.error('Eroare la încărcarea studenților', error);
      throw new Error('Nu s-au putut încărca studenții');
    }
  }

  async findOne(id: number): Promise<StudentWithUniversityDto | undefined> {
    try {
      const student = await this.studentsRepository.findOne({
        where: { id },
        relations: ['universitate'],
      });

      return student ? this.entityToDto(student) : undefined;
    } catch (error) {
      this.logger.error(`Eroare la găsirea studentului cu ID ${id}`, error);
      throw new Error('Nu s-a putut găsi studentul');
    }
  }

  async create(dto: StudentsCreateDto): Promise<StudentWithUniversityDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verific dacă universitatea există
      const universityExists = await this.universitiesService.exists(
        dto.id_universitate,
      );
      if (!universityExists) {
        // Arunc un răspuns de validare personalizat conform cerinței
        const statusCode = HttpStatus.UNPROCESSABLE_ENTITY; // 422
        throw new HttpException(
          {
            message: [
              {
                field: 'id_universitate',
                message:
                  'validarea a eșuat: universitatea nu există, fie ați greșit id-ul asociat',
              },
            ],
            error: HTTP_STATUS_CODES[statusCode],
            statusCode,
          },
          statusCode,
        );
      }

      // Creez studentul
      const student = this.studentsRepository.create({
        nume: dto.nume,
        prenume: dto.prenume,
        facultate: dto.facultate,
        specialitate: dto.specialitate,
        id_universitate: dto.id_universitate,
      });

      const savedStudent = await queryRunner.manager.save(student);

      // Incrementez numărul de studenți în universitate folosind același queryRunner
      const incrementSuccess =
        await this.universitiesService._changeStudentCount(
          dto.id_universitate,
          1,
          queryRunner,
        );
      if (!incrementSuccess) {
        throw new BadRequestException(
          'Eroare la actualizarea numărului de studenți',
        );
      }

      await queryRunner.commitTransaction();

      this.logger.log(
        `Studentul ${dto.nume} ${dto.prenume} a fost creat cu ID ${savedStudent.id}`,
      );

      // Încarc studentul cu relația universitate pentru răspuns
      const studentWithUniversity = await this.studentsRepository.findOne({
        where: { id: savedStudent.id },
        relations: ['universitate'],
      });

      return this.entityToDto(studentWithUniversity!);
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      if (
        error instanceof BadRequestException ||
        error instanceof HttpException
      ) {
        throw error;
      }

      this.logger.error('Eroare la crearea studentului', error);
      throw new Error('Nu s-a putut crea studentul');
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    dto: StudentsUpdateDto,
  ): Promise<StudentWithUniversityDto | undefined> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Găsesc studentul existent
      const existingStudent = await queryRunner.manager.findOneBy(
        StudentEntity,
        { id },
      );
      if (!existingStudent) {
        await queryRunner.rollbackTransaction();
        return undefined;
      }

      // Verific dacă noua universitate există
      const universityExists = await this.universitiesService.exists(
        dto.id_universitate,
      );
      if (!universityExists) {
        throw new BadRequestException('Universitatea specificată nu există!');
      }

      const oldUniversityId = existingStudent.id_universitate;
      const newUniversityId = dto.id_universitate;

      // Actualizez datele studentului
      existingStudent.nume = dto.nume;
      existingStudent.prenume = dto.prenume;
      existingStudent.facultate = dto.facultate;
      existingStudent.specialitate = dto.specialitate;
      existingStudent.id_universitate = newUniversityId;

      //const updatedStudent = await queryRunner.manager.save(existingStudent);
      await queryRunner.manager.save(existingStudent);

      // Dacă universitatea s-a schimbat, actualizez numărul de studenți
      if (oldUniversityId !== newUniversityId) {
        const decrementSuccess =
          await this.universitiesService.decrementStudentCount(oldUniversityId);
        const incrementSuccess =
          await this.universitiesService.incrementStudentCount(newUniversityId);

        if (!decrementSuccess || !incrementSuccess) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException(
            'Eroare la actualizarea numărului de studenți',
          );
        }

        this.logger.log(
          `Studentul cu ID ${id} a fost mutat de la universitatea ${oldUniversityId} la ${newUniversityId}`,
        );
      }

      await queryRunner.commitTransaction();

      this.logger.log(`Studentul cu ID ${id} a fost actualizat`);

      // Încarc studentul cu relația universitate pentru răspuns
      const studentWithUniversity = await this.studentsRepository.findOne({
        where: { id },
        relations: ['universitate'],
      });

      return this.entityToDto(studentWithUniversity!);
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(
        `Eroare la actualizarea studentului cu ID ${id}`,
        error,
      );
      throw new Error('Nu s-a putut actualiza studentul');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<StudentsDto | undefined> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const student = await queryRunner.manager.findOneBy(StudentEntity, {
        id,
      });
      if (!student) {
        await queryRunner.rollbackTransaction();
        return undefined;
      }

      const studentToReturn: StudentsDto = {
        id: student.id,
        nume: student.nume,
        prenume: student.prenume,
        facultate: student.facultate,
        specialitate: student.specialitate,
        id_universitate: student.id_universitate,
      };

      // Șterg studentul
      await queryRunner.manager.remove(student);

      // Decrementez numărul de studenți în universitate
      const decrementSuccess =
        await this.universitiesService.decrementStudentCount(
          student.id_universitate,
        );
      if (!decrementSuccess) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException(
          'Eroare la actualizarea numărului de studenți',
        );
      }

      await queryRunner.commitTransaction();

      this.logger.log(`Studentul cu ID ${id} a fost șters`);

      return studentToReturn;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(`Eroare la ștergerea studentului cu ID ${id}`, error);
      throw new Error('Nu s-a putut șterge studentul');
    } finally {
      await queryRunner.release();
    }
  }

  // Convertire din entity în DTO cu universitate îmbogățită
  private entityToDto(entity: StudentEntity): StudentWithUniversityDto {
    const universityInfo: UniversityInfoDto = entity.universitate
      ? {
          denumire: entity.universitate.denumire,
          adresa: entity.universitate.adresa,
        }
      : { denumire: '', adresa: '' };

    return {
      id: entity.id,
      nume: entity.nume,
      prenume: entity.prenume,
      facultate: entity.facultate,
      specialitate: entity.specialitate,
      id_universitate: entity.id_universitate,
      universitate: universityInfo,
    };
  }
}
