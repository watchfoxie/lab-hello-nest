import { Injectable } from '@nestjs/common';
import {
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';
import { BaseService } from '../../common/base/base.service';

@Injectable()
export class UniversitiesService extends BaseService<
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto
> {
  // Alias pentru a menține compatibilitatea
  get universities(): UniversitiesDto[] {
    return this.entities;
  }

  create(dto: UniversitiesCreateDto): UniversitiesDto {
    const university: UniversitiesDto = {
      id: this.getNextId(),
      denumire: dto.denumire,
      adresa: dto.adresa,
      numar_studenti: 0,
    };
    this.entities.push(university);
    return university;
  }

  update(id: number, dto: UniversitiesUpdateDto): UniversitiesDto | undefined {
    const index = this.findIndex(id);
    if (index > -1) {
      this.entities[index] = {
        ...this.entities[index],
        denumire: dto.denumire,
        adresa: dto.adresa,
      };
      return this.entities[index];
    }
    return undefined;
  }

  remove(id: number): UniversitiesDto | string | undefined {
    const index = this.findIndex(id);
    if (index > -1) {
      const university = this.entities[index];
      if (university.numar_studenti > 0) {
        return 'Universitatea nu poate fi ștearsă deoarece are studenți asociați.';
      }
      const removed = this.entities[index];
      this.entities.splice(index, 1);
      return removed;
    }
    return undefined;
  }
  decrementStudentCount(universityId: number): boolean {
    const university = this.findOne(universityId);
    if (university && university.numar_studenti > 0) {
      university.numar_studenti -= 1;
      return true;
    }
    return false;
  }

  incrementStudentCount(universityId: number): boolean {
    const university = this.findOne(universityId);
    if (university) {
      university.numar_studenti += 1;
      return true;
    }
    return false;
  }
}
