import { Diagnose } from '../types'
import diagnoseData from '../../data/diagnoses.json'

const getDiagnoses = (): Diagnose[] => {
  return diagnoseData
}

export default { getDiagnoses }
