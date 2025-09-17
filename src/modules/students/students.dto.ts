import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../common/constants/messages.constants';

export class StudentsCreateDto {
  @ApiProperty()
  @IsString({ message: 'numele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'prenumele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'id-ul universității trebuie să fie un număr întreg' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'facultatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'specialitatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  specialitate: string;
}

export class StudentsUpdateDto {
  @ApiProperty()
  @IsString({ message: 'numele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'prenumele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'id-ul universității trebuie să fie un număr întreg' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'facultatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'specialitatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  specialitate: string;
}

export class StudentsDto {
  @ApiProperty()
  @IsInt({ message: 'id-ul trebuie să fie un număr întreg' })
  id: number;

  @ApiProperty()
  @IsString({ message: 'numele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'prenumele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'id-ul universității trebuie să fie un număr întreg' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'facultatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'specialitatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  specialitate: string;
}

export class UniversityInfoDto {
  @ApiProperty()
  @IsString({ message: 'denumirea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  denumire: string;

  @ApiProperty()
  @IsString({ message: 'adresa trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  adresa: string;
}

export class StudentWithUniversityDto {
  @ApiProperty()
  @IsInt({ message: 'id-ul trebuie să fie un număr întreg' })
  id: number;

  @ApiProperty()
  @IsString({ message: 'numele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'prenumele trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'id-ul universității trebuie să fie un număr întreg' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'facultatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'specialitatea trebuie să fie un șir de caractere' })
  @MinLength(2, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  @MaxLength(25, { message: ERROR_MESSAGES.VALIDATION_LENGTH })
  specialitate: string;

  @ApiProperty({ type: UniversityInfoDto })
  universitate: UniversityInfoDto;
}
