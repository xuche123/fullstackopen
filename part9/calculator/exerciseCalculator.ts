interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments2 = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const numbers = args.slice(2).map(n => Number(n));
    if (numbers.some(n => isNaN(n))) {
        throw new Error('Provided values were not numbers!');
    }
    return numbers;
};
    
const exerciseCalculator = (exerciseHours: number[], target: number): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    let rating = 0;
    let ratingDescription = '';
    if (average < target) {
        rating = 1;
        ratingDescription = 'You need to work harder';
    } else if (average === target) {
        rating = 2;
        ratingDescription = 'You are doing well';
    } else {
        rating = 3;
        ratingDescription = 'You are doing great';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const [target, ...exerciseHours] = parseArguments2(process.argv);
    console.log(exerciseCalculator(exerciseHours, target));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}