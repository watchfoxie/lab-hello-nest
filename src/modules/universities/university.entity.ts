import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from '../students/student.entity';

@Entity('universities')
export class UniversityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  denumire: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  adresa: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  numar_studenti: number;

  // Relația One-to-Many cu StudentEntity
  @OneToMany(() => StudentEntity, (student) => student.universitate, {
    cascade: false, // Nu vreau să șterg automat studenții când se șterge universitatea
  })
  students: StudentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
