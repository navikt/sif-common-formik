import { YesOrNo } from '../types';
import { ValidationFunction } from './types';

export enum ValidateYesOrNoErrors {
    'unanswered' = 'yesOrNoUnanswered',
}

const validateYesOrNoIsAnswered: ValidationFunction<ValidateYesOrNoErrors> = (value: any) => {
    const isAnswered = value === YesOrNo.YES || value === YesOrNo.NO || value === YesOrNo.DO_NOT_KNOW;
    return isAnswered ? undefined : ValidateYesOrNoErrors.unanswered;
};

export default validateYesOrNoIsAnswered;
