import express from 'express';
const app = express();
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.set('query parser',
    (str: string) => qs.parse(str, {})
);

app.get('/bmi', (req, res) => {
    if (req.query.height === undefined || req.query.weight === undefined) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }
    
    const height = parseFloat(req.query.height as string);
    const weight = parseFloat(req.query.weight as string);
    
    try {

        const result = calculateBmi(height, weight);

        return res.json({
            weight,
            height,
            bmi: result
        });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: 'something went wrong'
        });
    }
});

app.post('/exercises', (req,res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target }: any = req.body;
    
    if(!daily_exercises || target === undefined ) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }
    console.log(daily_exercises, target);

    const result = calculateExercises(daily_exercises, target);
    return res.json({
        body: result
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});