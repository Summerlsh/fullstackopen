import React from "react";
import { Card, Icon, SemanticCOLORS } from "semantic-ui-react";

import { HealthCheckEntry, HealthCheckRating } from "../types";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let color: SemanticCOLORS;
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = "green";
      break;
    case HealthCheckRating.LowRisk:
      color = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      color = "orange";
      break;
    case HealthCheckRating.CriticalRisk:
      color = "red";
      break;
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user doctor" size="large" />
        </Card.Header>
        <Card.Meta>
          <em>{entry.description}</em>
        </Card.Meta>
        <Card.Description>
          <Icon name="heart" color={color} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheck;
