import { Entry, Diagnosis } from "../types"

interface EntryProps {
    entry: Entry
    diagnosis: Diagnosis[]
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryPage = ({ entry, diagnosis }: EntryProps) => {
    const getDiagnosisName = (code: string) => {
        const diagnosisName = diagnosis.find(d => d.code === code)?.name;
        return diagnosisName;
    }

    if (!entry) {
        return null;
    }

    const style = {
        border: "solid",
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        margin: 5
    }

    switch (entry.type) {
        case "Hospital":
            return (
                <div style={style}>
                    <h3>{entry.date}</h3>
                    <i>{entry.description}</i>
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                            <li key={code}>{code} {getDiagnosisName(code)}</li>
                        ))}
                    </ul>
                    {entry.discharge && <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>}
                    <p><b>Diagnose by: </b>{entry.specialist}</p>
                </div>
            )
        case "OccupationalHealthcare":
            return (
                <div style={style}>
                    <h3>{entry.date}</h3>
                    <i>{entry.description}</i>
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                            <li key={code}>{code} {getDiagnosisName(code)}</li>
                        ))}
                    </ul>
                    <p>Employer: {entry.employerName}</p>
                    {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
                    <p><b>Diagnose by: </b>{entry.specialist}</p>
                </div>
            )
        case "HealthCheck":
            return (
                <div style={style}>
                    <h3>{entry.date}</h3>
                    <i>{entry.description}</i>
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                            <li key={code}>{code} {getDiagnosisName(code)}</li>
                        ))}
                    </ul>
                    <p>Health check rating: {entry.healthCheckRating}</p>
                    <p><b>Diagnose by: </b>{entry.specialist}</p>
                </div>
            )
        default:
            return assertNever(entry);
    }
        
        
        
}

export default EntryPage