interface Arguments {
  height: number
  weight: number
}

const parseArgs = (args: string[]): Arguments => {
  if (args.length < 4) {
    throw new Error('Not enough arguments')
  }
  if (args.length > 4) {
    throw new Error('Too many arguments')
  }
  const inputs = args.slice(2)
  if (inputs.every(value => !isNaN(Number(value)))) {
    return {
      height: Number(inputs[0]),
      weight: Number(inputs[1])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2
  if (bmi < 15) {
    return 'Very severely underweight'
  } else if (bmi >= 15 && bmi < 16) {
    return 'Severely underweight'
  } else if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese Class I (Moderately obese)'
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese Class II (Severely obese)'
  } else {
    return 'Obese Class III (Very severely obese)'
  }
}

try {
  const { height, weight } = parseArgs(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
