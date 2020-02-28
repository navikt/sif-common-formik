import * as React from 'react';
import { validateYesOrNoIsAnswered } from '../../../../../dev/validation/fieldValidations';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { YesOrNo } from '../../../types/YesOrNo';
import FormikRadioPanelGroup from '../formik-radio-panel-group/FormikRadioPanelGroup';

interface YesOrNoQuestionProps<FieldName> {
    legend: string;
    name: FieldName;
    includeDoNotKnowOption?: boolean;
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
        [YesOrNo.DO_NOT_KNOW]?: string;
    };
    helperText?: React.ReactNode;
}

function FormikYesOrNoQuestion<FieldName>({
    legend,
    name,
    includeDoNotKnowOption,
    labels,
    helperText,
    ...restProps
}: YesOrNoQuestionProps<FieldName> & FormikInputCommonProps) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei', doNotKnow: doNotKnowLabel = 'Vet ikke' } = labels || {};
    return (
        <FormikRadioPanelGroup<FieldName>
            legend={<LabelWithInfo helperText={helperText}>{legend}</LabelWithInfo>}
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
