import patientsData from "../data/patients";
import { PatientEntry } from "../data/patients";
import { v1 as uuid } from "uuid";

const getAllEntries = () => {
	return patientsData;
};

const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addEntry = (patient: Omit<PatientEntry, 'id'>): PatientEntry => {	
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const id: string = uuid();
	const newPatient = { id, ...patient };
	patientsData.push(newPatient);
	return newPatient;
};

export default {
	getAllEntries,
	addEntry,
	getNonSensitiveEntries,

};