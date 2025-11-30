//Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

const calculateBmi = (height:number, weight: number) : string => {
    const meters = height / 100
    const bmi = (weight) / (meters * meters)
    switch(true){
        case (bmi < 18.5):
            return 'Underweight'
            break;
        case (bmi > 18.5 && bmi < 25):
            return 'Normal range'
            break;
        case (bmi > 25):
            return 'Overweight'
            break;

        default:
            return 'Invalid BMI'
            break;
    }
}

console.log(calculateBmi(180, 74))