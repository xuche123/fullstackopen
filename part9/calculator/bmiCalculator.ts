const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    const numbers = args.slice(2).map(n => Number(n));
    if (numbers.some(n => isNaN(n))) {
        throw new Error('Provided values were not numbers!');
    }
    return numbers;
};


const bmiCalculator = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
    const [height, weight] = parseArguments(process.argv);
    console.log(bmiCalculator(height, weight));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}