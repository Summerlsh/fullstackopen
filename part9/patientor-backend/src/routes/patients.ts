import express from 'express'

import patientService from '../services/patientService'
import toNewPatient from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientService.getPublicPatients())
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message)
    }
  }
})

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id)
  if (patient) {
    res.json(patient)
  } else {
    res.status(404).send('Not found')
  }
})

export default router
