import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import { Patient, Diagnosis, EntryFormValues } from "../types";
import EntryPage from "./EntryPage";
import EntryForm from "./EntryForm";

interface PatientPageProps {
    diagnosis: Diagnosis[]
}

const PatientPage = ({diagnosis} : PatientPageProps) => {

    const id = useParams().id;
    const [patient, setPatient] = useState<Patient | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    
    useEffect(() => {
        if (id) {
            const fetchPatient = async () => {
                const patient = await patientService.getPatient(id);
                setPatient(patient);
            };
            void fetchPatient();
        }
    }, [id]);

    const openForm = (): void => setFormVisible(true);
    const closeForm = (): void => setFormVisible(false);

    const submitNewEntry = async (values: EntryFormValues) => {
        if (!id) return;
        try {
            const patient = await patientService.addEntry(id, values);
            console.log("patient", patient)
            setPatient(patient);
            setFormVisible(false);
        } catch (e: unknown) {
            console.error("Unknown error", e);
        }
    };

    if (!patient) {
        return null;
    }

    return (
        <div>
            <h1>{patient.name}</h1>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <EntryForm visible={formVisible} onSubmit={submitNewEntry} onCancel={closeForm} onOpen={openForm} diagnoses={diagnosis}/>

            <h2>entries</h2>
            
            {patient.entries && patient.entries.map(entry => (
                <EntryPage key={entry.id} entry={entry} diagnosis={diagnosis} />
            ))}
        </div>
    )
}

export default PatientPage;