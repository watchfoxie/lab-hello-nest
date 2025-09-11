import { ApiProperty } from '@nestjs/swagger';

export class StudentsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nume: string;

  @ApiProperty()
  prenume: string;

  @ApiProperty()
  id_universitate: number;

  @ApiProperty()
  facultate: string;

  @ApiProperty()
  specialitate: string;
}
