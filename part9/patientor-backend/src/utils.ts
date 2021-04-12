import { Gender, NewPatient } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }
  return ssn
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth)
  }
  return dateOfBirth
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }
  return occupation
}

type Field = {
  name: unknown
  ssn: unknown
  dateOfBirth: unknown
  gender: unknown
  occupation: unknown
}

const toNewPatient = ({ name, ssn, dateOfBirth, gender, occupation }: Field): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  }
  return newPatient
}

export default toNewPatient
