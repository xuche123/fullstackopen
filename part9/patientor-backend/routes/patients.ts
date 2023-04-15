/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    
    const newPatientEntry = patientService.addEntry({
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn
    });
    res.json(newPatientEntry);
});
    
export default router;