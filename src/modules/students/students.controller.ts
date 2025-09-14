import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  StudentsDto,
  StudentWithUniversityDto,
  StudentsCreateDto,
  StudentsUpdateDto,
} from './students.dto';
import { StudentsService } from './students.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiStandardResponses } from '../../common/swagger/swagger-responses.util';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ type: [StudentsDto] })
  @ApiStandardResponses([StudentsDto])
  findAll() {
    const students = this.studentsService.findAll();
    if (students.length === 0) {
      return {
        message: 'Nu sunt studenți adăugați în baza de date!',
        students: [],
      };
    } else {
      return {
        message: 'Lista studenților:',
        students: [...students],
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  @ApiResponse({ type: StudentsDto })
  @ApiStandardResponses(StudentsDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const student = this.studentsService.findOne(id);
    if (!student) {
      return {
        message: 'Nu există student cu id-ul specificat!',
        student: null,
      };
    }
    return {
      message: 'Studentul găsit:',
      student,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ type: StudentWithUniversityDto })
  @ApiStandardResponses(StudentWithUniversityDto)
  create(@Body(new ValidationPipe()) dto: StudentsCreateDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ type: StudentsDto })
  @ApiStandardResponses(StudentsDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: StudentsUpdateDto,
  ) {
    const updated = this.studentsService.update(id, dto);
    if (!updated) {
      return {
        message: 'Nu există student cu id-ul specificat!',
        student: null,
      };
    }
    return {
      message: 'Student actualizat cu succes!',
      student: updated,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiStandardResponses()
  remove(@Param('id', ParseIntPipe) id: number) {
    const removed = this.studentsService.remove(id);
    if (!removed) {
      return {
        message: 'Nu există student cu id-ul specificat!',
        student: null,
      };
    }
    return {
      message: 'Student șters cu succes!',
      student: removed,
    };
  }
}
