import diagnosesData from '../../data/diagnoses'
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData

const getEntries = () => {
    return diagnoses
};

const addDiagnosis = () => {
    return null
}

export default {
    getEntries,
    addDiagnosis
}