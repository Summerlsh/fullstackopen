import React from "react";

import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheck";
import HospitalEntry from "./Hospital";
import OccupationalHealthCareEntry from "./OccupationalHealthCare";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
