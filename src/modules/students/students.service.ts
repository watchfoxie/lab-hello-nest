import { Injectable, BadRequestException } from '@nestjs/common';
import { StudentsDto, StudentWithUniversityDto } from './students.dto';
import { UniversitiesService } from '../universities/universities.service';

@Injectable()
export class StudentsService {
  private students: StudentsDto[] = [];

  constructor(private readonly universitiesService: UniversitiesService) {}

  findAll(): StudentsDto[] {
    return this.students.map((student) => {
      const university = this.universitiesService.findOne(
        student.id_universitate,
      );
      return {
        ...student,
        universitate: university
          ? { denumire: university.denumire, adresa: university.adresa }
          : null,
      };
    });
  }

  findOne(id: number): StudentsDto | undefined {
    return this.students.find((u) => u.id === id);
  }

  create(dto: StudentsDto): StudentWithUniversityDto {
    const university = this.universitiesService.findOne(dto.id_universitate);

    if (!university) {
      throw new BadRequestException('Universitatea nu există');
    }

    this.students.push(dto);

    this.universitiesService.incrementStudentCount(dto.id_universitate);

    return {
      ...dto,
      universitate: {
        denumire: university.denumire,
        adresa: university.adresa,
      },
    };
  }

  update(id: number, dto: StudentsDto): StudentsDto | undefined {
    const index = this.students.findIndex((u) => u.id === id);
    if (index > -1) {
      this.students[index] = dto;
      return dto;
    }
    return undefined;
  }

  remove(id: number): void {
    this.students = this.students.filter((u) => u.id !== id);
  }
}
