import { Injectable, BadRequestException } from '@nestjs/common';
import {
  StudentsDto,
  StudentWithUniversityDto,
  StudentsCreateDto,
  StudentsUpdateDto,
} from './students.dto';
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

  findOne(id: number): StudentWithUniversityDto | undefined {
    const student = this.students.find((u) => u.id === id);
    if (!student) return undefined;
    const university = this.universitiesService.findOne(
      student.id_universitate,
    );
    return {
      ...student,
      universitate: university
        ? { denumire: university.denumire, adresa: university.adresa }
        : { denumire: '', adresa: '' },
    };
  }

  private nextId = 0;

  create(dto: StudentsCreateDto): StudentWithUniversityDto {
    const university = this.universitiesService.findOne(dto.id_universitate);

    if (!university) {
      throw new BadRequestException(
        'Universitatea nu există, fie ați greșit id-ul asociat',
      );
    }

    const student: StudentsDto = {
      id: this.nextId++,
      ...dto,
    };
    this.students.push(student);
    this.universitiesService.incrementStudentCount(dto.id_universitate);

    return {
      ...student,
      universitate: {
        denumire: university.denumire,
        adresa: university.adresa,
      },
    };
  }

  update(
    id: number,
    dto: StudentsUpdateDto,
  ): StudentWithUniversityDto | undefined {
    const index = this.students.findIndex((u) => u.id === id);
    const university = this.universitiesService.findOne(dto.id_universitate);

    if (!university) {
      throw new BadRequestException(
        'Universitatea nu există, fie ați greșit id-ul asociat',
      );
    }
    if (index > -1) {
      const oldStudent = this.students[index];
      const updatedStudent: StudentsDto = {
        id,
        ...dto,
      };
      this.students[index] = updatedStudent;

      // Dacă id_universitate s-a schimbat, actualizez numărul de studenți
      if (oldStudent.id_universitate !== dto.id_universitate) {
        this.universitiesService.decrementStudentCount(
          oldStudent.id_universitate,
        );
        this.universitiesService.incrementStudentCount(dto.id_universitate);
      }

      return {
        ...updatedStudent,
        universitate: {
          denumire: university.denumire,
          adresa: university.adresa,
        },
      };
    }
    return undefined;
  }

  remove(id: number): StudentsDto | undefined {
    const index = this.students.findIndex((u) => u.id === id);
    if (index > -1) {
      const removed = this.students[index];
      this.students.splice(index, 1);
      // Decrementez numărul de studenți din universitatea asociată
      if (removed && removed.id_universitate !== undefined) {
        this.universitiesService.decrementStudentCount(removed.id_universitate);
      }
      return removed;
    }
    return undefined;
  }
}
