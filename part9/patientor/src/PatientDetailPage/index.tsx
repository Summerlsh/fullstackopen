import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { List, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetailPage = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchPatientDetail = async () => {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({ type: "SET_PATIENT_DETAIL", payload: patient });
    };

    if (selectedPatient?.id !== id) {
      void fetchPatientDetail();
    }
  }, [dispatch]);

  if (!selectedPatient) {
    return null;
  }
  return (
    <List>
      <List.Header as="h2">
        {selectedPatient.name}
        {selectedPatient.gender === "male" ? <Icon name="man" /> : <Icon name="woman" />}
      </List.Header>
      <List.Item>ssn: {selectedPatient.ssn}</List.Item>
      <List.Item>occupation: {selectedPatient.occupation}</List.Item>
    </List>
  );
};

export default PatientDetailPage;
