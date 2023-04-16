import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient, Diagnosis } from "../types";
import EntryPage from "./EntryPage";

interface PatientPageProps {
    diagnosis: Diagnosis[]
}

const PatientPage = ({diagnosis} : PatientPageProps) => {

    const id = useParams().id;
    const [patient, setPatient] = useState<Patient|null>(null);
    
    useEffect(() => {
        if (id) {
            const fetchPatient = async () => {
                const patient = await patientService.getPatient(id);
                setPatient(patient);
            };
            void fetchPatient();
        }
    }, [id]);

    if (!patient) {
        return null;
    }

    return (
        <div>
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>

            <h2>entries</h2>
            
            {patient.entries && patient.entries.map(entry => (
                <EntryPage key={entry.id} entry={entry} diagnosis={diagnosis} />
            ))}
        </div>
    )
}

export default PatientPage;