export interface Token {
  access: string;
  refresh: string;
}

export interface localStorageKeys {
  accessToken: string;
  refreshToken: string;
}

export const Roles = {
  PASSENGER: 'Passengers',
  ADMIN: 'Motorpool Management System Admins',
  ADVISOR: 'Motorpool Management System Advisors',
  DRIVERS: 'Motorpool Management System Drivers',
} as const

