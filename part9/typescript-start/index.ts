import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((t) => isNaN(Number(t)))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  return res.json(
    calculateExercises(
      daily_exercises.map((t) => Number(t)),
      Number(target)
    )
  );
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
