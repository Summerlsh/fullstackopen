import { omit } from 'lodash'
import { v1 as uuid } from 'uuid'

import { Patient, NewPatient, PublicPatient } from '../types'
import patients from '../../data/patients'

const getPatients = (): Patient[] => {
  return patients
}

const getPublicPatients = (): PublicPatient[] => {
  return patients.map((patient) => omit(patient, ['ssn', 'entries']))
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }
  patients.push(newPatient)
  return newPatient
}

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id)
}

export default { getPatients, getPublicPatients, addPatient, getPatientById }
