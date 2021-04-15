import React from "react";
import { CoursePart } from "../App";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <span style={{ fontStyle: "italic" }}>{part.description}</span>
        </p>
      );
    case "submission":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <span style={{ fontStyle: "italic" }}>{part.description}</span>
          <br />
          {part.exerciseSubmissionLink}
        </p>
      );
    case "groupProject":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <span>project exercises {part.groupProjectCount}</span>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <span style={{ fontStyle: "italic" }}>{part.description}</span>
          <br />
          <span>required skills: {part.requirements.join(", ")}</span>
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
