import { Injectable, BadRequestException } from '@nestjs/common';
import {
  StudentsDto,
  StudentWithUniversityDto,
  StudentsCreateDto,
  StudentsUpdateDto,
} from './students.dto';
import { UniversitiesService } from '../universities/universities.service';
import { BaseService } from '../../common/base/base.service';
import { ERROR_MESSAGES } from '../../common/constants/messages.constants';

@Injectable()
export class StudentsService extends BaseService<
  StudentsDto,
  StudentsCreateDto,
  StudentsUpdateDto
> {
  constructor(private readonly universitiesService: UniversitiesService) {
    super();
  }

  // Alias pentru compatibilitate
  get students(): StudentsDto[] {
    return this.entities;
  }

  findAll(): StudentWithUniversityDto[] {
    return this.entities.map((student) =>
      this.enrichStudentWithUniversity(student),
    );
  }

  findOne(id: number): StudentWithUniversityDto | undefined {
    const student = super.findOne(id);
    if (!student) return undefined;
    return this.enrichStudentWithUniversity(student);
  }

  private enrichStudentWithUniversity(
    student: StudentsDto,
  ): StudentWithUniversityDto {
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

  create(dto: StudentsCreateDto): StudentWithUniversityDto {
    const university = this.universitiesService.findOne(dto.id_universitate);

    if (!university) {
      throw new BadRequestException(ERROR_MESSAGES.UNIVERSITY_NOT_FOUND);
    }

    const student: StudentsDto = {
      id: this.getNextId(),
      ...dto,
    };
    this.entities.push(student);
    this.universitiesService.incrementStudentCount(dto.id_universitate);

    return this.enrichStudentWithUniversity(student);
  }

  update(
    id: number,
    dto: StudentsUpdateDto,
  ): StudentWithUniversityDto | undefined {
    const index = this.findIndex(id);
    const university = this.universitiesService.findOne(dto.id_universitate);

    if (!university) {
      throw new BadRequestException(ERROR_MESSAGES.UNIVERSITY_NOT_FOUND);
    }

    if (index > -1) {
      const oldStudent = this.entities[index];
      const updatedStudent: StudentsDto = {
        id,
        ...dto,
      };
      this.entities[index] = updatedStudent;

      // Dacă id_universitate s-a schimbat, actualizez numărul de studenți
      if (oldStudent.id_universitate !== dto.id_universitate) {
        this.universitiesService.decrementStudentCount(
          oldStudent.id_universitate,
        );
        this.universitiesService.incrementStudentCount(dto.id_universitate);
      }

      return this.enrichStudentWithUniversity(updatedStudent);
    }
    return undefined;
  }

  remove(id: number): StudentsDto | undefined {
    const index = this.findIndex(id);
    if (index > -1) {
      const removed = this.entities[index];
      this.entities.splice(index, 1);
      // Decrementez numărul de studenți din universitatea asociată
      if (removed && removed.id_universitate !== undefined) {
        this.universitiesService.decrementStudentCount(removed.id_universitate);
      }
      return removed;
    }
    return undefined;
  }
}
