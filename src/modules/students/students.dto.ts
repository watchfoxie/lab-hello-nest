import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class StudentsCreateDto {
  @ApiProperty()
  @IsString({ message: 'Numele trebuie să fie un șir de caractere!' })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'Prenumele trebuie să fie un șir de caractere!' })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'ID-ul universității trebuie să fie un număr întreg!' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'Facultatea trebuie să fie un șir de caractere!' })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'Specialitatea trebuie să fie un șir de caractere!' })
  specialitate: string;
}

export class StudentsUpdateDto {
  @ApiProperty()
  @IsString({ message: 'Numele trebuie să fie un șir de caractere!' })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'Prenumele trebuie să fie un șir de caractere!' })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'ID-ul universității trebuie să fie un număr întreg!' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'Facultatea trebuie să fie un șir de caractere!' })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'Specialitatea trebuie să fie un șir de caractere!' })
  specialitate: string;
}

export class StudentsDto {
  @ApiProperty()
  @IsInt({ message: 'ID-ul trebuie să fie un număr întreg!' })
  id: number;

  @ApiProperty()
  @IsString({ message: 'Numele trebuie să fie un șir de caractere!' })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'Prenumele trebuie să fie un șir de caractere!' })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'ID-ul universității trebuie să fie un număr întreg!' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'Facultatea trebuie să fie un șir de caractere!' })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'Specialitatea trebuie să fie un șir de caractere!' })
  specialitate: string;
}

export class UniversityInfoDto {
  @ApiProperty()
  @IsString({ message: 'Denumirea trebuie să fie un șir de caractere!' })
  denumire: string;

  @ApiProperty()
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere!' })
  adresa: string;
}

export class StudentWithUniversityDto {
  @ApiProperty()
  @IsInt({ message: 'ID-ul trebuie să fie un număr întreg!' })
  id: number;

  @ApiProperty()
  @IsString({ message: 'Numele trebuie să fie un șir de caractere!' })
  nume: string;

  @ApiProperty()
  @IsString({ message: 'Prenumele trebuie să fie un șir de caractere!' })
  prenume: string;

  @ApiProperty()
  @IsInt({ message: 'ID-ul universității trebuie să fie un număr întreg!' })
  id_universitate: number;

  @ApiProperty()
  @IsString({ message: 'Facultatea trebuie să fie un șir de caractere!' })
  facultate: string;

  @ApiProperty()
  @IsString({ message: 'Specialitatea trebuie să fie un șir de caractere!' })
  specialitate: string;

  @ApiProperty({ type: UniversityInfoDto })
  universitate: UniversityInfoDto;
}
