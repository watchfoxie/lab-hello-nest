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
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';
import { UniversitiesService } from './universities.service';
import {
  BaseController,
  ApiResponseMessages,
} from '../../common/base/base.controller';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiStandardResponses } from '../../common/swagger/swagger-responses.util';

const UNIVERSITIES_MESSAGES: ApiResponseMessages = {
  noEntitiesFound: 'Nu sunt universități adăugate în baza de date!',
  entitiesList: 'Lista universităților:',
  entityNotFound: 'Nu există universitate cu id-ul specificat!',
  entityFound: 'Universitatea găsită:',
  entityUpdated: 'Universitate actualizată cu succes!',
  entityDeleted: 'Universitate ștearsă cu succes!',
};

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController extends BaseController<
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto
> {
  constructor(private readonly universitiesService: UniversitiesService) {
    super(universitiesService, UNIVERSITIES_MESSAGES, 'universities');
  }

  @Get()
  @ApiOperation({ summary: 'Afișați lista tuturor universităților' })
  @ApiResponse({ type: [UniversitiesDto] })
  @ApiStandardResponses([UniversitiesDto])
  findAll() {
    return super.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afișați o universitate după ID' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return super.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Adăugați o nouă universitate' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  @ApiResponse({ status: 201, description: 'Universitate adăugată cu succes' })
  create(@Body(new ValidationPipe()) dto: UniversitiesCreateDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizați informațiile unei universități' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UniversitiesUpdateDto,
  ) {
    return super.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ștergeți o universitate' })
  @ApiStandardResponses()
  remove(@Param('id', ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
