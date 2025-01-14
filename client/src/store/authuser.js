import { atomWithStorage } from 'jotai/utils'


export const userData = atomWithStorage('personDT', []);
export const userID = atomWithStorage('personID', []);
export const tokenV = atomWithStorage('tokenV', []);
export const sessionV = atomWithStorage('sessionValue', false);
export const employeeV = atomWithStorage('employeeValue', []);


export const compUser = atomWithStorage('compUserValue', []);
export const companiesList = atomWithStorage('companiesListValue', []);

export const dashboardCountV = atomWithStorage('dashboardCountValue', []);