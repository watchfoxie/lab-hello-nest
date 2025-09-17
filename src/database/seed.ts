/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Încărc variabilele de mediu
config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'academy_db',
  entities: ['src/**/*.entity.ts'],
});

async function seedData() {
  try {
    await dataSource.initialize();
    console.log('✅ Conexiune stabilită cu baza de date');

    // Inserez universități de test
    await dataSource.query(`
      INSERT INTO universities (denumire, adresa, numar_studenti) VALUES
      ('Universitatea Politehnica din București', 'Splaiul Independenței nr. 313, București', 0),
      ('Universitatea din București', 'Bd. Regina Elisabeta nr. 4-12, București', 0),
      ('Universitatea Babeș-Bolyai', 'Str. Mihail Kogălniceanu nr. 1, Cluj-Napoca', 0);
    `);
    console.log('✅ Universități adăugate cu succes');

    // Obțin ID-urile universităților pentru a le folosi la studenți
    const universities = await dataSource.query(
      'SELECT id, denumire FROM universities',
    );
    console.log('📋 Universități disponibile:', universities);

    // Inserez studenți de test
    await dataSource.query(`
      INSERT INTO students (nume, prenume, facultate, specialitate, id_universitate) VALUES
      ('Popescu', 'Ion', 'Facultatea de Automatică și Calculatoare', 'Calculatoare', ${universities[0].id}),
      ('Ionescu', 'Maria', 'Facultatea de Electronică', 'Electronică Aplicată', ${universities[0].id}),
      ('Vasilescu', 'Alexandru', 'Facultatea de Matematică și Informatică', 'Informatică', ${universities[1].id}),
      ('Georgescu', 'Ana', 'Facultatea de Fizică', 'Fizică Computațională', ${universities[1].id}),
      ('Stanciu', 'Radu', 'Facultatea de Matematică și Informatică', 'Matematică', ${universities[2].id});
    `);
    console.log('✅ Studenți adăugați cu succes');

    // Actualizez numărul de studenți pentru fiecare universitate
    for (const university of universities) {
      const studentCount = await dataSource.query(
        'SELECT COUNT(*) as count FROM students WHERE id_universitate = ?',
        [university.id],
      );

      await dataSource.query(
        'UPDATE universities SET numar_studenti = ? WHERE id = ?',
        [studentCount[0].count, university.id],
      );

      console.log(
        `📊 Universitatea "${university.denumire}" are ${studentCount[0].count} studenți`,
      );
    }

    console.log('🎉 Seed complet cu succes!');
  } catch (error) {
    console.error('❌ Eroare la seed:', error);
  } finally {
    await dataSource.destroy();
  }
}

// Rulez seed-ul
seedData().catch((error) => {
  console.error('❌ Eroare la rularea seedData:', error);
});
