import express from 'express'
import patientsService from '../services/patientService'
import newPatientParser from '../utils'
import z from 'zod'
import { NewPatientEntry, PatientEntry } from '../types'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
    const patients = patientsService.getNonSensitiveEntries()
    res.json(patients)
});
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if(error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues })
  }else {
    next(error)
  }
}
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addPatient = patientsService.addPatient(req.body)
  res.json(addPatient)
});

router.use(errorMiddleware)
export default router