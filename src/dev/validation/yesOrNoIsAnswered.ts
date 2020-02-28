import { YesOrNo } from '../../common/formik/types/YesOrNo';

export const yesOrNoIsAnswered = (answer?: YesOrNo) => answer === YesOrNo.YES || answer === YesOrNo.NO;
