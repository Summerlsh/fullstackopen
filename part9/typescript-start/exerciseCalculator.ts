interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  target: number;
  times: number[];
}

const parseExerciseArgs = (args: string[]): ExerciseArguments => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  const inputs: number[] = args.slice(2).map((arg) => Number(arg));
  if (inputs.every((value) => !isNaN(value))) {
    const [target, ...times] = inputs;
    return {
      target,
      times,
    };
  } else {
    throw new Error("Provided values must be numbers!");
  }
};

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const average =
    dailyExercises.reduce((acc, cur) => acc + cur, 0) / dailyExercises.length ||
    0;
  let rating: number, ratingDescription: string;
  if (average < 1) {
    rating = 1;
    ratingDescription = "bad";
  } else if (average >= 1 && average < 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "very good";
  }

  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((time) => time !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { times, target } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(times, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}
