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
import { StudentsDto, StudentWithUniversityDto } from './students.dto';
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
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  @ApiResponse({ type: StudentsDto })
  @ApiStandardResponses(StudentsDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ type: StudentWithUniversityDto })
  @ApiStandardResponses(StudentWithUniversityDto)
  create(@Body(new ValidationPipe()) dto: StudentsDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ type: StudentsDto })
  @ApiStandardResponses(StudentsDto)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: StudentsDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiStandardResponses()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}
