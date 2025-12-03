//Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

const calculateBmi = (height:number, weight: number) : string => {
    if(height <= 0) {
        throw new Error('Height cant be a negative number')
    }
    if(weight <= 0) {
        throw new Error('Weight cant be a negative number')
    }
    const meters = height / 100
    const bmi = (weight) / (meters * meters)
    switch(true){
        case (bmi < 18.5):
            return 'Underweight'
        case (bmi >= 18.5 && bmi <= 25):
            return 'Normal range'
        case (bmi > 25):
            return 'Overweight'
        default:
            return 'Invalid BMI'
    }
}
if(require.main === module){
    try {
        const height: number = Number(process.argv[2])
        const weight: number = Number(process.argv[3])
        const result = calculateBmi(height, weight)
        console.log(result)
    } catch(error: unknown) {
        let errorMessage = 'Something bad happened'
        if(error instanceof Error) {
            errorMessage += 'Error: '+ error.message
        }
        console.log(errorMessage)
    }
}

export default calculateBmi