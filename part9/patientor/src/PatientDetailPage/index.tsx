import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { List, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetail } from "../state";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";

const PatientDetailPage = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchPatientDetail = async () => {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setPatientDetail(patient));
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
      <List.Header as="h3">entries</List.Header>
      {selectedPatient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </List>
  );
};

export default PatientDetailPage;
