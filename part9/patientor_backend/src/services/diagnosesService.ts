import diagnosesData from '../../data/diagnoses'
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData

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