import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../common/constants/messages.constants';

export class UniversitiesCreateDto {
  @ApiProperty()
  @IsString({ message: 'Denumirea trebuie să fie un șir de caractere!' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  denumire: string;

  @ApiProperty()
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere!' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  adresa: string;
}

export class UniversitiesUpdateDto {
  @ApiProperty()
  @IsString({ message: 'Denumirea trebuie să fie un șir de caractere!' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  denumire: string;

  @ApiProperty()
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere!' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  adresa: string;
}

export class UniversitiesDto {
  @ApiProperty()
  @IsInt({ message: 'ID-ul trebuie să fie un număr întreg!' })
  id: number;

  @ApiProperty()
  @IsString({ message: 'Denumirea trebuie să fie un șir de caractere!' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  denumire: string;

  @ApiProperty()
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere!' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  adresa: string;

  @ApiProperty()
  @IsInt({ message: 'Numărul de studenți trebuie să fie un număr întreg!' })
  numar_studenti: number;
}
