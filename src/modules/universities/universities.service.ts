import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryFailedError } from 'typeorm';
import {
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';
import { UniversityEntity } from './university.entity';

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

  async remove(id: number): Promise<UniversitiesDto | string | undefined> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const university = await queryRunner.manager.findOneBy(UniversityEntity, {
        id,
      });
      if (!university) {
        await queryRunner.rollbackTransaction();
        return undefined;
      }

      // Verific dacă universitatea are studenți
      if (university.numar_studenti > 0) {
        await queryRunner.rollbackTransaction();
        return 'Universitatea nu poate fi ștearsă deoarece are studenți asociați.';
      }

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
        return 'Universitatea nu poate fi ștearsă deoarece are studenți asociați.';
      }

      this.logger.error(`Eroare la ștergerea universității cu ID ${id}`, error);
      throw new Error('Nu s-a putut șterge universitatea');
    } finally {
      await queryRunner.release();
    }
  }

  async decrementStudentCount(universityId: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const university = await queryRunner.manager.findOneBy(UniversityEntity, {
        id: universityId,
      });
      if (!university || university.numar_studenti <= 0) {
        await queryRunner.rollbackTransaction();
        return false;
      }

      university.numar_studenti -= 1;
      await queryRunner.manager.save(university);

      await queryRunner.commitTransaction();
      this.logger.log(
        `Numărul de studenți pentru universitatea ${universityId} a fost decrementat la ${university.numar_studenti}`,
      );

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Eroare la decrementarea numărului de studenți pentru universitatea ${universityId}`,
        error,
      );
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async incrementStudentCount(universityId: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const university = await queryRunner.manager.findOneBy(UniversityEntity, {
        id: universityId,
      });
      if (!university) {
        await queryRunner.rollbackTransaction();
        return false;
      }

      university.numar_studenti += 1;
      await queryRunner.manager.save(university);

      await queryRunner.commitTransaction();
      this.logger.log(
        `Numărul de studenți pentru universitatea ${universityId} a fost incrementat la ${university.numar_studenti}`,
      );

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Eroare la incrementarea numărului de studenți pentru universitatea ${universityId}`,
        error,
      );
      return false;
    } finally {
      await queryRunner.release();
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
