// Coduri de status HTTP
export const HTTP_STATUS_CODES = {
  // 2xx - Succes
  200: 'Cererea a fost procesată cu succes',
  201: 'Resursa a fost creată cu succes',
  204: 'Cererea a fost procesată, dar nu există conținut de returnat',

  // 4xx - Erori de client
  400: 'Cerere incorectă - datele trimise sunt invalide',
  401: 'Neautorizat - autentificarea este necesară',
  403: 'Interzis - accesul la resursă este refuzat',
  404: 'Resursa solicitată nu a fost găsită',
  409: 'Conflict - resursa există deja sau este în conflict',
  422: 'Entitate neprocesabilă - validarea datelor a eșuat',

  // 5xx - Erori de server
  500: 'Eroare internă a serverului',
  502: 'Gateway defect',
  503: 'Serviciu indisponibil temporar',
  504: 'Timeout la gateway',
} as const;

export type HttpStatusCode = keyof typeof HTTP_STATUS_CODES;
