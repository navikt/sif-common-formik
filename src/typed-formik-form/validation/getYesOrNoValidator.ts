import { YesOrNo } from '../types';
import { ValidationFunction } from './types';

export enum validateYesOrNoIsAnsweredError {
    'yesOrNoIsUnanswered' = 'yesOrNoIsUnanswered',
}

const getYesOrNoValidator = (): ValidationFunction<validateYesOrNoIsAnsweredError> => (value: any) => {
    const isAnswered = value === YesOrNo.YES || value === YesOrNo.NO || value === YesOrNo.DO_NOT_KNOW;
    return isAnswered ? undefined : validateYesOrNoIsAnsweredError.yesOrNoIsUnanswered;
};

export default getYesOrNoValidator;
