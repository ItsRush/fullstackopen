import express from 'express'
import { Response } from 'express';
import patientsService from '../services/patientService'
import { NonSensitivePatientEntry } from '../types';

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    const patients = patientsService.getNonSensitiveEntries()
    res.json(patients)
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router