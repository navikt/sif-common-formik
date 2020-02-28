import * as React from 'react';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { YesOrNo } from '../../../types/YesOrNo';
import FormikRadioPanelGroup, {
    FormikRadioPanelGroupProps
} from '../formik-radio-panel-group/FormikRadioPanelGroup';

export interface FormikYesOrNoQuestionProps<FieldName> extends FormikRadioPanelGroupProps<FieldName> {
    includeDoNotKnowOption?: boolean;
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
        [YesOrNo.DO_NOT_KNOW]?: string;
    };
}

function FormikYesOrNoQuestion<FieldName>({
    legend,
    name,
    includeDoNotKnowOption,
    labels,
    info,
    ...restProps
}: FormikYesOrNoQuestionProps<FieldName> & FormikInputCommonProps) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei', doNotKnow: doNotKnowLabel = 'Vet ikke' } = labels || {};
    return (
        <FormikRadioPanelGroup<FieldName>
            legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>}
            name={name}
            className={'twoColumnPanelGruppe'}
            radios={[
                { label: yesLabel, value: YesOrNo.YES },
                { label: noLabel, value: YesOrNo.NO },
                ...(includeDoNotKnowOption ? [{ label: doNotKnowLabel, value: YesOrNo.DO_NOT_KNOW }] : [])
            ]}
            {...restProps}
        />
    );
}

export default FormikYesOrNoQuestion;
