import { Injectable } from '@nestjs/common';
import { UniversitiesDto } from './universities.dto';

@Injectable()
export class UniversitiesService {
  private universities: UniversitiesDto[] = [];

  findAll(): UniversitiesDto[] {
    return this.universities;
  }

  findOne(id: number): UniversitiesDto | undefined {
    return this.universities.find((u) => u.id === id);
  }

  create(dto: UniversitiesDto): UniversitiesDto {
    this.universities.push(dto);
    return dto;
  }

  update(id: number, dto: UniversitiesDto): UniversitiesDto | undefined {
    const index = this.universities.findIndex((u) => u.id === id);
    if (index > -1) {
      this.universities[index] = dto;
      return dto;
    }
    return undefined;
  }

  remove(id: number): void {
    this.universities = this.universities.filter((u) => u.id !== id);
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
