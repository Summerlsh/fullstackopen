export interface Diagnose {
  code: string
  name: string
  latin?: string
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnoseCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

interface HealthCheck extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface SickLeave {
  startDate: string
  endDate: string
}
interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeave
}

interface Discharge {
  date: string
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export type Entry = HealthCheck | OccupationalHealthCareEntry | HospitalEntry

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries?: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>

export type NewPatient = Omit<Patient, 'id'>

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
