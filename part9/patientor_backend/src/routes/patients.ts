import express from 'express'
import { Response } from 'express';
import patientsService from '../services/patientService'
import { NonSensitivePatientEntry } from '../types';
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    const patients = patientsService.getNonSensitiveEntries()
    res.json(patients)
});

router.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body)

    const addedEntry = patientsService.addPatient(NewPatientEntry);
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong'
    if(error instanceof Error) {
      errorMessage += 'Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
});

export default router