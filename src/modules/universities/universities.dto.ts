import { ApiProperty } from '@nestjs/swagger';

export class UniversitiesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  denumire: string;

  @ApiProperty()
  adresa: string;

  @ApiProperty()
  numar_studenti: number;
}
