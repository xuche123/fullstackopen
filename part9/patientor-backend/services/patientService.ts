import patientsData from "../data/patients";
import { PatientEntry, NonSensitivePatientEntry } from "../data/patients";
import uuid from "uuid";

const getAllEntries = () => {
	return patientsData;
};

const getPatient = (id: string): PatientEntry | undefined => {
	const patient = patientsData.find(p => p.id === id);
	return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
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
	getPatient
};