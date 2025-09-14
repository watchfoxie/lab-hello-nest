import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UniversitiesDto {
  @ApiProperty()
  @IsInt({ message: 'ID-ul trebuie să fie un număr întreg!' })
  id: number;

  @ApiProperty()
  @IsString({ message: 'Denumirea trebuie să fie un șir de caractere!' })
  denumire: string;

  @ApiProperty()
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere!' })
  adresa: string;

  @ApiProperty()
  @IsInt({ message: 'Numărul de studenți trebuie să fie un număr întreg!' })
  numar_studenti: number;
}
