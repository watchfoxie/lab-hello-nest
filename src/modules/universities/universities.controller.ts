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

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all universities' })
  @ApiResponse({ status: 200, type: [UniversitiesDto] })
  findAll() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university by id' })
  @ApiResponse({ status: 200, type: UniversitiesDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create university' })
  @ApiResponse({ status: 201, type: UniversitiesDto })
  create(@Body(new ValidationPipe()) dto: UniversitiesDto) {
    return this.universitiesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update university' })
  @ApiResponse({ status: 200, type: UniversitiesDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UniversitiesDto) {
    return this.universitiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete university' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.remove(id);
  }
}
