import { atomWithStorage } from 'jotai/utils'


export const userData = atomWithStorage('personDT', []);
export const userID = atomWithStorage('personID', []);
export const tokenV = atomWithStorage('tokenV', []);
export const sessionV = atomWithStorage('sessionV', false);
export const employeeV = atomWithStorage('employeesValue', []);


export const compUser = atomWithStorage('compUserValue', []);
export const dashboardCountV = atomWithStorage('dashboardCountValue', []);