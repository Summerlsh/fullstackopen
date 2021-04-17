import React from "react";
import { Card, Icon, List, Grid } from "semantic-ui-react";

import { useStateValue } from "../state";
import { OccupationalHealthCareEntry } from "../types";

const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope" size="large" /> {entry.employerName}
        </Card.Header>
        <Card.Meta>
          <em>{entry.description}</em>
        </Card.Meta>
        <Card.Description>
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
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2}>
          <Grid.Column>start date: {entry.sickLeave?.startDate}</Grid.Column>
          <Grid.Column>end date: {entry.sickLeave?.endDate}</Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthCare;
