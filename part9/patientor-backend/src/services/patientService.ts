import { omit } from 'lodash'

import { Patient } from '../types'
import patientData from '../../data/patients.json'

const patients = patientData as Patient[]

const getPatients = (): Patient[] => {
  return patients
}

const getNonSsnPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map((patient): Omit<Patient, 'ssn'> => omit(patient, ['ssn']))
}

export default { getPatients, getNonSsnPatients }
