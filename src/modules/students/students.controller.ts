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
  BadRequestException,
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
  private readonly logger = new Logger(StudentsController.name);

  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Afișați lista tuturor studenților' })
  @ApiResponse({ type: [StudentsDto] })
  @ApiStandardResponses([StudentsDto])
  async findAll() {
    try {
      const students = await this.studentsService.findAll();

      if (students.length === 0) {
        return {
          status: 200,
          message: 'Nu sunt studenți adăugați în baza de date!',
          data: students,
        };
      }

      return {
        status: 200,
        message: 'Lista studenților:',
        data: students,
      };
    } catch (error) {
      this.logger.error('Eroare la încărcarea studenților', error);
      throw new HttpException(
        'Eroare internă de server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afișați un student după ID' })
  @ApiResponse({ type: StudentsDto })
  @ApiStandardResponses(StudentsDto)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const student = await this.studentsService.findOne(id);

      if (!student) {
        throw new HttpException(
          'Nu există student cu id-ul specificat!',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 200,
        message: 'Studentul găsit:',
        data: student,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Eroare la găsirea studentului cu ID ${id}`, error);
      throw new HttpException(
        'Eroare internă de server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Adăugați un student nou' })
  @ApiResponse({ type: StudentWithUniversityDto })
  @ApiStandardResponses(StudentWithUniversityDto)
  async create(@Body(new ValidationPipe()) dto: StudentsCreateDto) {
    try {
      const student = await this.studentsService.create(dto);

      return {
        status: 201,
        message: `Studentul "${dto.nume} ${dto.prenume}" a fost adăugat cu succes!`,
        data: student,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error('Eroare la crearea studentului', error);
      throw new HttpException(
        'Eroare la crearea studentului',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizați informațiile unui student' })
  @ApiResponse({ type: StudentsDto })
  @ApiStandardResponses(StudentsDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: StudentsUpdateDto,
  ) {
    try {
      const student = await this.studentsService.update(id, dto);

      if (!student) {
        throw new HttpException(
          'Nu există student cu id-ul specificat!',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 200,
        message: 'Student actualizat cu succes!',
        data: student,
      };
    } catch (error) {
      if (
        error instanceof HttpException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      this.logger.error(
        `Eroare la actualizarea studentului cu ID ${id}`,
        error,
      );
      throw new HttpException(
        'Eroare la actualizarea studentului',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ștergeți un student' })
  @ApiStandardResponses()
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const student = await this.studentsService.remove(id);

      if (!student) {
        throw new HttpException(
          'Nu există student cu id-ul specificat!',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: 200,
        message: 'Student șters cu succes!',
        data: student,
      };
    } catch (error) {
      if (
        error instanceof HttpException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      this.logger.error(`Eroare la ștergerea studentului cu ID ${id}`, error);
      throw new HttpException(
        'Eroare la ștergerea studentului',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
