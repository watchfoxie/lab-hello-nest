import { Injectable } from '@nestjs/common';
import {
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';

@Injectable()
export class UniversitiesService {
  private universities: UniversitiesDto[] = [];

  findAll(): UniversitiesDto[] {
    return this.universities;
  }

  findOne(id: number): UniversitiesDto | undefined {
    return this.universities.find((u) => u.id === id);
  }

  private nextId = 0;

  create(dto: UniversitiesCreateDto): UniversitiesDto {
    const university: UniversitiesDto = {
      id: this.nextId++,
      denumire: dto.denumire,
      adresa: dto.adresa,
      numar_studenti: 0,
    };
    this.universities.push(university);
    return university;
  }

  update(id: number, dto: UniversitiesUpdateDto): UniversitiesDto | undefined {
    const index = this.universities.findIndex((u) => u.id === id);
    if (index > -1) {
      this.universities[index] = {
        ...this.universities[index],
        denumire: dto.denumire,
        adresa: dto.adresa,
      };
      return this.universities[index];
    }
    return undefined;
  }

  remove(id: number): UniversitiesDto | string | undefined {
    const index = this.universities.findIndex((u) => u.id === id);
    if (index > -1) {
      const university = this.universities[index];
      if (university.numar_studenti > 0) {
        return 'Universitatea nu poate fi ștearsă deoarece are studenți asociați.';
      }
      const removed = this.universities[index];
      this.universities.splice(index, 1);
      return removed;
    }
    return undefined;
  }
  decrementStudentCount(universityId: number): boolean {
    const university = this.universities.find((u) => u.id === universityId);
    if (university && university.numar_studenti > 0) {
      university.numar_studenti -= 1;
      return true;
    }
    return false;
  }

  incrementStudentCount(universityId: number): boolean {
    const university = this.universities.find((u) => u.id === universityId);
    if (university) {
      university.numar_studenti += 1;
      return true;
    }
    return false;
  }
}
