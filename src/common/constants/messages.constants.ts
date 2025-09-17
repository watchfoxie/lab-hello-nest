export const ERROR_MESSAGES = {
  UNIVERSITY_HAS_STUDENTS:
    'universitatea nu poate fi ștearsă deoarece are studenți asociați',
  UNIVERSITY_NOT_FOUND: 'universitatea nu există, fie ați greșit id-ul asociat',
  STUDENT_NOT_FOUND: 'nu există student cu id-ul specificat',
  VALIDATION_FAILED: 'validarea a eșuat',
  VALIDATION_LENGTH:
    'lungimea șirului de caractere este invalidă (min. 2, max. 25)',
} as const;

export const SUCCESS_MESSAGES = {
  UNIVERSITY_CREATED: 'universitate adăugată cu succes',
  UNIVERSITY_UPDATED: 'universitate actualizată cu succes',
  UNIVERSITY_DELETED: 'universitate ștearsă cu succes',
  STUDENT_CREATED: 'student adăugat cu succes',
  STUDENT_UPDATED: 'student actualizat cu succes',
  STUDENT_DELETED: 'student șters cu succes',
} as const;
