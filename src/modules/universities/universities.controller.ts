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
import { UniversitiesDto } from './universities.dto';
import { UniversitiesService } from './universities.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiStandardResponses } from '../../common/swagger/swagger-responses.util';

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all universities' })
  @ApiResponse({ type: [UniversitiesDto] })
  @ApiStandardResponses([UniversitiesDto])
  findAll() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university by id' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create university' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  @ApiResponse({ status: 201, description: 'Universitate adăugată cu succes' })
  create(@Body(new ValidationPipe()) dto: UniversitiesDto) {
    return this.universitiesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update university' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UniversitiesDto) {
    return this.universitiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete university' })
  @ApiStandardResponses()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.remove(id);
  }
}
