import patientsData from "../data/patients";
import { PatientEntry } from "../data/patients";
import uuid from "uuid";

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
	const id: string = uuid.v1();
	const newPatient = { id, ...patient };
	patientsData.push(newPatient);
	return newPatient;
};

export default {
	getAllEntries,
	addEntry,
	getNonSensitiveEntries,

};