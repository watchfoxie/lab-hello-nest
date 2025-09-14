import {
  Controller,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Post,
  Put,
  Delete,
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
  @ApiOperation({ summary: 'Afișați lista tuturor studenților' })
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
  @ApiOperation({ summary: 'Afișați un student după ID' })
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
  @ApiOperation({ summary: 'Adăugați un student nou' })
  @ApiResponse({ type: StudentWithUniversityDto })
  @ApiStandardResponses(StudentWithUniversityDto)
  create(@Body(new ValidationPipe()) dto: StudentsCreateDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizați informațiile unui student' })
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
  @ApiOperation({ summary: 'Ștergeți un student' })
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
