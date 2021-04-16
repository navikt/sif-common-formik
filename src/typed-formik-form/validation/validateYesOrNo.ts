import { YesOrNo } from '../types';
import { ValidationFunction } from './types';

export enum ValidateYesOrNoError {
    'yesOrNoIsUnanswered' = 'yesOrNoIsUnanswered',
}

const validateYesOrNoIsAnswered: ValidationFunction<ValidateYesOrNoError> = (value: any) => {
    const isAnswered = value === YesOrNo.YES || value === YesOrNo.NO || value === YesOrNo.DO_NOT_KNOW;
    return isAnswered ? undefined : ValidateYesOrNoError.yesOrNoIsUnanswered;
};

export default validateYesOrNoIsAnswered;
