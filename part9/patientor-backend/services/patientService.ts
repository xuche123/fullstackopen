import patientsData from "../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import uuid from "uuid";

const getAllEntries = () => {
	return patientsData;
};

const getPatient = (id: string): Patient | undefined => {
	const patient = patientsData.find(p => p.id === id);
	return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
	}));
};

const addEntry = (patient: NewPatient): Patient => {	
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