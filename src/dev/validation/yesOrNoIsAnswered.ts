import { YesOrNo } from '../../typed-formik-form/types';

export const yesOrNoIsAnswered = (answer?: YesOrNo) => answer === YesOrNo.YES || answer === YesOrNo.NO;
