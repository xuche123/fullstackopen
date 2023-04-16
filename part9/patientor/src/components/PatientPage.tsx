import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient, Diagnosis } from "../types";

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

    const getDiagnosisName = (code: string) => {
        const diagnosisName = diagnosis.find(d => d.code === code)?.name;
        return diagnosisName;
    }

    return (
        <div>
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>

            <h2>entries</h2>
            
            {patient.entries && patient.entries.map(entry => (
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code} {getDiagnosisName(code)}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default PatientPage;