import { Injectable } from '@nestjs/common';
import { StudentsDto } from './students.dto';

@Injectable()
export class StudentsService {
  private students: StudentsDto[] = [];

  findAll(): StudentsDto[] {
    return this.students;
  }

  findOne(id: number): StudentsDto | undefined {
    return this.students.find((u) => u.id === id);
  }

  create(dto: StudentsDto): StudentsDto {
    this.students.push(dto);
    return dto;
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
