import * as React from 'react';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import { YesOrNo } from '../../types/YesOrNo';
import FormikRadioPanelGroup, {
    FormikRadioPanelGroupProps
} from '../formik-radio-panel-group/FormikRadioPanelGroup';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';

export interface FormikYesOrNoQuestionProps<FieldName> extends Omit<FormikRadioPanelGroupProps<FieldName>, 'radios'> {
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
}: FormikYesOrNoQuestionProps<FieldName> & TypedFormInputCommonProps) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei', doNotKnow: doNotKnowLabel = 'Vet ikke' } = labels || {};
    return (
        <FormikRadioPanelGroup<FieldName>
            legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>}
            name={name}
            useTwoColumns={true}
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
