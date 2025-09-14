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
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';
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
    const universities = this.universitiesService.findAll();
    if (universities.length === 0) {
      return {
        message: 'Nu sunt universități adăugate în baza de date!',
        universities: [],
      };
    } else {
      return {
        message: 'Lista universităților:',
        universities: [...universities],
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university by id' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const university = this.universitiesService.findOne(id);
    if (!university) {
      return {
        message: 'Nu există universitate cu id-ul specificat!',
        university: null,
      };
    }
    return {
      message: 'Universitatea găsită:',
      university,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create university' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  @ApiResponse({ status: 201, description: 'Universitate adăugată cu succes' })
  create(
    @Body(new ValidationPipe())
    dto: UniversitiesCreateDto,
  ) {
    return this.universitiesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update university' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UniversitiesUpdateDto,
  ) {
    const updated = this.universitiesService.update(id, dto);
    if (!updated) {
      return {
        message: 'Nu există universitate cu id-ul specificat!',
        university: null,
      };
    }
    return {
      message: 'Universitate actualizată cu succes!',
      university: updated,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete university' })
  @ApiStandardResponses()
  remove(@Param('id', ParseIntPipe) id: number) {
    const removed = this.universitiesService.remove(id);
    if (!removed) {
      return {
        message: 'Nu există universitate cu id-ul specificat!',
        university: null,
      };
    }
    if (typeof removed === 'string') {
      return {
        message: removed,
        university: null,
      };
    }
    return {
      message: 'Universitate ștearsă cu succes!',
      university: removed,
    };
  }
}
