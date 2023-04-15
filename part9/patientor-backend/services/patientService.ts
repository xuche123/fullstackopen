import patientsData from "../data/patients";
import { PatientEntry } from "../data/patients";

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

const addEntry = () => {
    return null;
};

export default {
    getAllEntries,
    addEntry,
    getNonSensitiveEntries
};