import { YesOrNo } from '../../typed-formik-form/types/YesOrNo';

export const yesOrNoIsAnswered = (answer?: YesOrNo) => answer === YesOrNo.YES || answer === YesOrNo.NO;
