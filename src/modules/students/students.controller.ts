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
import { HTTP_STATUS_CODES } from 'src/common/status-codes/http-status-codes';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ type: [StudentsDto] })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  @ApiResponse({ type: StudentsDto })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ type: StudentWithUniversityDto })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  create(@Body(new ValidationPipe()) dto: StudentsDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ type: StudentsDto })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: StudentsDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}
