interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (times: number[], target: number): Result => {
  const average = times.reduce((acc, cur) => acc + cur) / times.length;
  let rating: number, ratingDescription: string;
  if (average < 1) {
    rating = 1
    ratingDescription = 'bad'
  } else if (average >= 1 && average < 2) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'very good'
  }

  return {
    periodLength: times.length,
    trainingDays: times.filter(time => time !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
