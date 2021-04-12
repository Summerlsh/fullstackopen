import { omit } from 'lodash'
import { v1 as uuid } from 'uuid'

import { Patient, NewPatient, NonSsnPatient } from '../types'
import patientData from '../../data/patients.json'

const patients = patientData as Patient[]

const getPatients = (): Patient[] => {
  return patients
}

const getNonSsnPatients = (): NonSsnPatient[] => {
  return patients.map(patient => omit(patient, ['ssn']))
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }
  patients.push(newPatient)
  return newPatient
}

export default { getPatients, getNonSsnPatients, addPatient }
