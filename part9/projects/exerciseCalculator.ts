interface Exercises {
    days: number,
    trainingDays: number,
    target: number, //daily hours 
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

const calculateExercises = (dailyHours: number[], target:number): Exercises => {

    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(h => h > 0).length
    const average = dailyHours.reduce((a,b) => a+b,0 ) / dailyHours.length
    let rating : number
    let ratingDescription : string

    if(target <= 0) {
        throw new Error('Target must be a positive number');
    }

    const success = average >= target

    if(average < target) {
        rating = 1
        ratingDescription = 'Unfortunately u have not reached ur goal this week'
    }
    else if(average === target) {
        rating = 2
        ratingDescription = 'U have reached ur goal this week!'
    }
    else if( average > target) {
        rating = 3
        ratingDescription = 'Good job! U have exceeded ur goal this week!'
    }

    return {
        days: periodLength,
        trainingDays,
        target, //target: target
        average,
        success,
        rating,
        ratingDescription
    }
}

console.log(calculateExercises([0,3,4,0,5,3,3],3))