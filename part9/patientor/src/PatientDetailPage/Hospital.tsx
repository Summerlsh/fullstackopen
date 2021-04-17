import React from "react";
import { Card, Grid, Icon, List } from "semantic-ui-react";

import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" size="large" />
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
          <Grid.Column>discharge date: {entry.discharge.date}</Grid.Column>
          <Grid.Column>criteria: {entry.discharge.criteria}</Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default Hospital;
