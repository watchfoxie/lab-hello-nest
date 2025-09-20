import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryFailedError, QueryRunner } from 'typeorm';
import {
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';
import { UniversityEntity } from './university.entity';
import { ERROR_MESSAGES } from 'src/common/constants/messages.constants';

@Injectable()
export class UniversitiesService {
  private readonly logger = new Logger(UniversitiesService.name);

  constructor(
    @InjectRepository(UniversityEntity)
    private readonly universitiesRepository: Repository<UniversityEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // Alias pentru a menține compatibilitatea
  async universities(): Promise<UniversitiesDto[]> {
    return this.findAll();
  }

  async findAll(): Promise<UniversitiesDto[]> {
    try {
      const universities = await this.universitiesRepository.find();
      return universities.map((entity) => this.entityToDto(entity));
    } catch (error) {
      this.logger.error('Eroare la încărcarea universităților', error);
      throw new Error('Nu s-au putut încărca universitățile');
    }
  }

  async findOne(id: number): Promise<UniversitiesDto | undefined> {
    try {
      const university = await this.universitiesRepository.findOneBy({ id });
      return university ? this.entityToDto(university) : undefined;
    } catch (error) {
      this.logger.error(`Eroare la găsirea universității cu ID ${id}`, error);
      throw new Error('Nu s-a putut găsi universitatea');
    }
  }

  async create(dto: UniversitiesCreateDto): Promise<UniversitiesDto> {
    try {
      const university = this.universitiesRepository.create({
        denumire: dto.denumire,
        adresa: dto.adresa,
        numar_studenti: 0,
      });

      const savedUniversity =
        await this.universitiesRepository.save(university);
      this.logger.log(
        `Universitatea ${dto.denumire} a fost creată cu ID ${savedUniversity.id}`,
      );

      return this.entityToDto(savedUniversity);
    } catch (error) {
      this.logger.error('Eroare la crearea universității', error);
      throw new Error('Nu s-a putut crea universitatea');
    }
  }

  async update(
    id: number,
    dto: UniversitiesUpdateDto,
  ): Promise<UniversitiesDto | undefined> {
    try {
      const university = await this.universitiesRepository.findOneBy({ id });
      if (!university) {
        return undefined;
      }

      university.denumire = dto.denumire;
      university.adresa = dto.adresa;

      const updatedUniversity =
        await this.universitiesRepository.save(university);
      this.logger.log(`Universitatea cu ID ${id} a fost actualizată`);

      return this.entityToDto(updatedUniversity);
    } catch (error) {
      this.logger.error(
        `Eroare la actualizarea universității cu ID ${id}`,
        error,
      );
      throw new Error('Nu s-a putut actualiza universitatea');
    }
  }

  async remove(id: number): Promise<UniversitiesDto | undefined> {
    // Verific mai întâi dacă universitatea există și are studenți
    const university = await this.universitiesRepository.findOneBy({ id });
    if (!university) {
      return undefined;
    }

    if (university.numar_studenti > 0) {
      throw new HttpException(
        {
          message: [
            {
              field: 'id',
              message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.UNIVERSITY_HAS_STUDENTS}`,
            },
          ],
          error: 'Conflict',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const universityToReturn = this.entityToDto(university);
      await queryRunner.manager.remove(university);

      await queryRunner.commitTransaction();
      this.logger.log(`Universitatea cu ID ${id} a fost ștearsă`);

      return universityToReturn;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // Tratez eroarea de integritate referențială (foreign key constraint)
      if (
        error instanceof QueryFailedError &&
        error.message.includes('foreign key constraint')
      ) {
        this.logger.warn(
          `Încercare de ștergere a universității cu ID ${id} care are studenți asociați`,
        );
        throw new HttpException(
          {
            message: [
              {
                field: 'id',
                message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.UNIVERSITY_HAS_STUDENTS}`,
              },
            ],
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }

      this.logger.error(`Eroare la ștergerea universității cu ID ${id}`, error);
      throw new Error('Nu s-a putut șterge universitatea');
    } finally {
      await queryRunner.release();
    }
  }

  async decrementStudentCount(universityId: number): Promise<boolean> {
    return this._changeStudentCount(universityId, -1);
  }

  async incrementStudentCount(universityId: number): Promise<boolean> {
    return this._changeStudentCount(universityId, 1);
  }

  // Modifică numărul de studenți pentru universitate folosind un QueryRunner extern dacă este furnizat.
  async _changeStudentCount(
    universityId: number,
    delta: number,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    let runner = queryRunner;
    let ownTransaction = false;
    if (!runner) {
      runner = this.dataSource.createQueryRunner();
      await runner.connect();
      await runner.startTransaction();
      ownTransaction = true;
    }
    try {
      const university = await runner.manager.findOneBy(UniversityEntity, {
        id: universityId,
      });
      if (!university || (delta < 0 && university.numar_studenti <= 0)) {
        if (ownTransaction) await runner.rollbackTransaction();
        return false;
      }
      university.numar_studenti += delta;
      await runner.manager.save(university);
      if (ownTransaction) await runner.commitTransaction();
      this.logger.log(
        `Numărul de studenți pentru universitatea ${universityId} a fost modificat la ${university.numar_studenti}`,
      );
      return true;
    } catch (error) {
      if (ownTransaction) await runner.rollbackTransaction();
      this.logger.error(
        `Eroare la modificarea numărului de studenți pentru universitatea ${universityId}`,
        error,
      );
      return false;
    } finally {
      if (ownTransaction) await runner.release();
    }
  }

  // Metodă pentru a verifica dacă universitatea există
  async exists(id: number): Promise<boolean> {
    try {
      const count = await this.universitiesRepository.countBy({ id });
      return count > 0;
    } catch (error) {
      this.logger.error(
        `Eroare la verificarea existenței universității cu ID ${id}`,
        error,
      );
      return false;
    }
  }

  // Convertire din entity în DTO
  private entityToDto(entity: UniversityEntity): UniversitiesDto {
    return {
      id: entity.id,
      denumire: entity.denumire,
      adresa: entity.adresa,
      numar_studenti: entity.numar_studenti,
    };
  }
}
