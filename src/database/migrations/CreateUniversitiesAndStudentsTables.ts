import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUniversitiesAndStudentsTables implements MigrationInterface {
  name = 'CreateUniversitiesAndStudentsTables';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Creez tabela universities
    await queryRunner.createTable(
      new Table({
        name: 'universities',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'denumire',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'adresa',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'numar_studenti',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Creez tabela students
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nume',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'prenume',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'facultate',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'specialitate',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'id_universitate',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Creez index pe id_universitate pentru performanță
    await queryRunner.query(`
      CREATE INDEX IDX_students_id_universitate ON students (id_universitate)
    `);

    // Creez foreign key constraint cu RESTRICT
    await queryRunner.query(`
      ALTER TABLE students 
      ADD CONSTRAINT FK_students_id_universitate 
      FOREIGN KEY (id_universitate) REFERENCES universities(id) 
      ON DELETE RESTRICT ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Elimin FK constraint
    await queryRunner.query(`
      ALTER TABLE students DROP FOREIGN KEY FK_students_id_universitate
    `);

    // Elimin index
    await queryRunner.query(`
      DROP INDEX IDX_students_id_universitate ON students
    `);

    // Elimin tabelele în ordine inversă
    await queryRunner.dropTable('students');
    await queryRunner.dropTable('universities');
  }
}
