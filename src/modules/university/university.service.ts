import { Injectable } from '@nestjs/common';
import { UniversityDto } from './university.dto';

@Injectable()
export class UniversityService {
  private universities: UniversityDto[] = [];

  findAll(): UniversityDto[] {
    return this.universities;
  }

  findOne(id: number): UniversityDto | undefined {
    return this.universities.find((u) => u.id === id);
  }

  create(dto: UniversityDto): UniversityDto {
    this.universities.push(dto);
    return dto;
  }

  update(id: number, dto: UniversityDto): UniversityDto | undefined {
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
}
