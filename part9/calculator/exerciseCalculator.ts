interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
    

const exerciseCalculator = (exerciseHours: Array<number>, target: number): Result => {
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


console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));