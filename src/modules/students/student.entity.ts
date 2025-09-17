import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UniversityEntity } from '../universities/university.entity';

@Entity('students')
@Index(['id_universitate']) // Index pe FK pentru performanță
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nume: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  prenume: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  facultate: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  specialitate: string;

  // FK către UniversityEntity, stocat ca număr
  @Column({ type: 'int', nullable: false })
  id_universitate: number;

  // Relația Many-to-One cu UniversityEntity
  @ManyToOne(() => UniversityEntity, (university) => university.students, {
    nullable: false,
    onDelete: 'RESTRICT', // Blochează ștergerea universității dacă are studenți
  })
  @JoinColumn({ name: 'id_universitate' })
  universitate: UniversityEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
