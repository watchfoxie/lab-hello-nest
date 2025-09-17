export const ERROR_MESSAGES = {
  UNIVERSITY_HAS_STUDENTS:
    'Universitatea nu poate fi ștearsă deoarece are studenți asociați.',
  UNIVERSITY_NOT_FOUND: 'Universitatea nu există, fie ați greșit id-ul asociat',
  STUDENT_NOT_FOUND: 'Nu există student cu id-ul specificat!',
  VALIDATION_FAILED: 'Validarea a eșuat',
  VALIDATION_LENGTH:
    'Lungimea șirului de caractere este invalidă (min. 2, max. 25)',
} as const;

export const SUCCESS_MESSAGES = {
  UNIVERSITY_CREATED: 'Universitate adăugată cu succes',
  UNIVERSITY_UPDATED: 'Universitate actualizată cu succes!',
  UNIVERSITY_DELETED: 'Universitate ștearsă cu succes!',
  STUDENT_CREATED: 'Student adăugat cu succes',
  STUDENT_UPDATED: 'Student actualizat cu succes!',
  STUDENT_DELETED: 'Student șters cu succes!',
} as const;
