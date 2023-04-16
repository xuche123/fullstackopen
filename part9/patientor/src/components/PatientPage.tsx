import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientPage = () => {

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
        </div>
    )
}

export default PatientPage;