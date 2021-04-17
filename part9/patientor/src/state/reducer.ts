import { State } from "./state";
import { Diagnose, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnose[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAIL":
      return {
        ...state,
        selectedPatient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload.reduce(
          (acc, diagnose) => ({ ...acc, [diagnose.code]: diagnose }),
          {}
        )
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatientDetail = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_DETAIL",
    payload: patient
  };
};

export const setDiagnoses = (diagnoses: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};
