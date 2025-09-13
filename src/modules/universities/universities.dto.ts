import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UniversitiesDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  denumire: string;

  @ApiProperty()
  @IsString()
  adresa: string;

  @ApiProperty()
  @IsInt()
  numar_studenti: number;
}
