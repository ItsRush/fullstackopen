import { NextFunction } from "express";
import { Request,Response } from "express";
import  {newPatientSchema} from './types'

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next()
    }catch (error: unknown) {
        next(error)
    }
}

export default newPatientParser