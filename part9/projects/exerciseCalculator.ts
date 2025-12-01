interface Exercises {
    days: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string
    target: number, //daily hours 
    average: number,
}

const calculateExercises = (dailyHours: number[], target:number): Exercises => {
    if(dailyHours.length < 1) {
        throw new Error('Not enough arguments')
    }
    if(target <= 0) {
        throw new Error('Target must be a positive number');
    }

    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(h => h > 0).length
    const average = dailyHours.reduce((a,b) => a+b,0 ) / dailyHours.length
    let rating : number
    let ratingDescription : string


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
        success,
        rating,
        ratingDescription,
        target, //target: target
        average
    }
}
try {
    const allArgs: number[] = process.argv.slice(2).map(arg => Number(arg))
    const target: number = allArgs[0]
    const hours: number[] = allArgs.slice(1)
    const results = calculateExercises(hours, target)
    console.log(results)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if(error instanceof Error) {
        errorMessage += 'Error: '+ error.message
    }
    console.log(errorMessage)
}