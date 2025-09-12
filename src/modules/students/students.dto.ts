/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class StudentsDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  nume: string;

  @ApiProperty()
  @IsString()
  prenume: string;

  @ApiProperty()
  @IsInt()
  id_universitate: number;

  @ApiProperty()
  @IsString()
  facultate: string;

  @ApiProperty()
  @IsString()
  specialitate: string;
}

export class UniversityInfoDto {
  @ApiProperty()
  @IsString()
  denumire: string;

  @ApiProperty()
  @IsString()
  adresa: string;
}

export class StudentWithUniversityDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  nume: string;

  @ApiProperty()
  @IsString()
  prenume: string;

  @ApiProperty()
  @IsInt()
  id_universitate: number;

  @ApiProperty()
  @IsString()
  facultate: string;

  @ApiProperty()
  @IsString()
  specialitate: string;

  @ApiProperty({ type: UniversityInfoDto })
  universitate: UniversityInfoDto;
}
