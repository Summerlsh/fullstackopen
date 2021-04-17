import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { List, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetail } from "../state";
import { Patient } from "../types";

const PatientDetailPage = () => {
  const [{ selectedPatient, diagnoses }, dispatch] = useStateValue();
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
        <Fragment key={entry.id}>
          <List.Item>
            <span>{entry.date}</span>{" "}
            <span style={{ fontStyle: "italic" }}>{entry.description}</span>
          </List.Item>
          <List.List as="ul">
            {entry.diagnoseCodes?.map((code) => {
              const diagnose = diagnoses[code];
              return (
                <List.Item as="li" key={code}>
                  {diagnose.code} {diagnose.name}
                </List.Item>
              );
            })}
          </List.List>
        </Fragment>
      ))}
    </List>
  );
};

export default PatientDetailPage;
