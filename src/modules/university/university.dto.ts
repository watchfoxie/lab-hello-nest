import { ApiProperty } from '@nestjs/swagger';

export class UniversityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nume: string;

  @ApiProperty()
  prenume: string;

  @ApiProperty()
  facultate: string;

  @ApiProperty()
  specialitate: string;
}
