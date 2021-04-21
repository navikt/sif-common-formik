import { YesOrNo } from '../types';
import { ValidationError, ValidationFunction } from './types';

export enum ValidateYesOrNoError {
    'yesOrNoIsUnanswered' = 'yesOrNoIsUnanswered',
}

type YesOrNoValidationResult = ValidateYesOrNoError.yesOrNoIsUnanswered | ValidationError;

type Errors = {
    [ValidateYesOrNoError.yesOrNoIsUnanswered]: ValidateYesOrNoError.yesOrNoIsUnanswered | ValidationError;
};

const defaultErrors: Errors = {
    yesOrNoIsUnanswered: ValidateYesOrNoError.yesOrNoIsUnanswered,
};

const getYesOrNoValidator = (customErrors?: Errors): ValidationFunction<YesOrNoValidationResult> => (value: any) => {
    const isAnswered = value === YesOrNo.YES || value === YesOrNo.NO || value === YesOrNo.DO_NOT_KNOW;
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    return isAnswered ? undefined : errors[ValidateYesOrNoError.yesOrNoIsUnanswered];
};

export default getYesOrNoValidator;
