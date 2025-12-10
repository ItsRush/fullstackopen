import express from 'express'
import { Response } from 'express';
import patientsService from '../services/patientService'
import { NonSensitivePatientEntry } from '../types';

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    const patients = patientsService.getNonSensitiveEntries()
    res.json(patients)
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body

  const addedEntry = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  })

  res.json(addedEntry);
});

export default router