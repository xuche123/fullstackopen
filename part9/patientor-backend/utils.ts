import { NewPatient, Gender } from './types';

const toNewPatientEntry = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ( !('name' in object)) throw new Error('name missing');
  if ( !('occupation' in object)) throw new Error('occupation missing');
  if ( !('ssn' in object)) throw new Error('ssn missing');
  if ( !('gender' in object)) throw new Error('gender missing');
  if ( !('dateOfBirth' in object)) throw new Error('dateOfBirth missing');

  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    ssn: parseString(object.ssn, 'occupation'),
    entries: []
  };
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (value: unknown, field: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${field}: ${value}`);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(value);
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
      throw new Error(`Value of gender incorrect: ${value}`);
  }
  return value;
};

export default toNewPatientEntry;