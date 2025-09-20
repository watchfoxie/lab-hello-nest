import {
  Controller,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  UniversitiesDto,
  UniversitiesCreateDto,
  UniversitiesUpdateDto,
} from './universities.dto';
import { UniversitiesService } from './universities.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiStandardResponses } from '../../common/swagger/swagger-responses.util';
import { ERROR_MESSAGES } from '../../common/constants/messages.constants';

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController {
  private readonly logger = new Logger(UniversitiesController.name);

  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Afișați lista tuturor universităților' })
  @ApiResponse({ type: [UniversitiesDto] })
  @ApiStandardResponses([UniversitiesDto])
  async findAll() {
    try {
      const universities = await this.universitiesService.findAll();

      if (universities.length === 0) {
        return {
          status: 200,
          message: 'Nu sunt universități adăugate în baza de date!',
          data: universities,
        };
      }

      return {
        status: 200,
        message: 'Lista universităților:',
        data: universities,
      };
    } catch (error) {
      this.logger.error('Eroare la încărcarea universităților', error);
      throw new HttpException(
        'Eroare internă de server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afișați o universitate după ID' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const university = await this.universitiesService.findOne(id);

      if (!university) {
        throw new HttpException(
          {
            message: [
              {
                field: 'id',
                message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.UNIVERSITY_NOT_FOUND}`,
              },
            ],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 200,
        message: 'Universitatea găsită:',
        data: university,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Eroare la găsirea universității cu ID ${id}`, error);
      throw new HttpException(
        'Eroare internă de server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Adăugați o nouă universitate' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  @ApiResponse({ status: 201, description: 'Universitate adăugată cu succes' })
  async create(@Body(new ValidationPipe()) dto: UniversitiesCreateDto) {
    try {
      const university = await this.universitiesService.create(dto);

      return {
        status: 201,
        message: `Universitatea ${dto.denumire} a fost adăugată cu succes!`,
        data: university,
      };
    } catch (error) {
      this.logger.error('Eroare la crearea universității', error);
      throw new HttpException(
        'Eroare la crearea universității',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizați informațiile unei universități' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiStandardResponses(UniversitiesDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UniversitiesUpdateDto,
  ) {
    try {
      const university = await this.universitiesService.update(id, dto);

      if (!university) {
        throw new HttpException(
          {
            message: [
              {
                field: 'id',
                message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.UNIVERSITY_NOT_FOUND}`,
              },
            ],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 200,
        message: 'Universitate actualizată cu succes!',
        data: university,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Eroare la actualizarea universității cu ID ${id}`,
        error,
      );
      throw new HttpException(
        'Eroare la actualizarea universității',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ștergeți o universitate' })
  @ApiStandardResponses()
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.universitiesService.remove(id);

      if (!result) {
        throw new HttpException(
          {
            message: [
              {
                field: 'id',
                message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.UNIVERSITY_NOT_FOUND}`,
              },
            ],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 200,
        message: 'Universitate ștearsă cu succes!',
        data: result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Eroare la ștergerea universității cu ID ${id}`, error);
      throw new HttpException(
        'Eroare la ștergerea universității',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
