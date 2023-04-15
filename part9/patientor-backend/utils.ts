import { NewPatientEntry, Gender } from "./data/patients";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseValue(object.name, "name"),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseValue(object.ssn, "ssn"),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            gender: parseGender(object.gender),
            occupation: parseValue(object.occupation, "occupation"),
        };
        return newEntry;
    }    
    
    throw new Error('Incorrect or missing data');
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseValue = (value: unknown, field: string): string => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

export default toNewPatientEntry;