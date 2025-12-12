import { z } from 'zod'

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
})

export interface Diagnosis {
    code: string,
    name: string,
    latin? : string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>

export type NewPatientEntry = z.infer<typeof newPatientSchema>

export interface PatientEntry extends NewPatientEntry {
    id: string;
}

