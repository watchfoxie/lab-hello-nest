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
import { UniversityDto } from './university.dto';
import { UniversityService } from './university.service';

@ApiTags('university')
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all universities' })
  @ApiResponse({ status: 200, type: [UniversityDto] })
  findAll() {
    return this.universityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university by id' })
  @ApiResponse({ status: 200, type: UniversityDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.universityService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create university' })
  @ApiResponse({ status: 201, type: UniversityDto })
  create(@Body() dto: UniversityDto) {
    return this.universityService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update university' })
  @ApiResponse({ status: 200, type: UniversityDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UniversityDto) {
    return this.universityService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete university' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.universityService.remove(id);
  }
}
