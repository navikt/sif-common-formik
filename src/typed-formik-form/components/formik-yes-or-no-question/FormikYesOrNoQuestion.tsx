import React from 'react';
import { TypedFormInputCommonProps, YesOrNo } from '../../types';
import FormikRadioPanelGroup, { FormikRadioPanelGroupProps } from '../formik-radio-panel-group/FormikRadioPanelGroup';

export interface FormikYesOrNoQuestionProps<FieldName> extends Omit<FormikRadioPanelGroupProps<FieldName>, 'radios'> {
    includeDoNotKnowOption?: boolean;
    useTwoColumns?: boolean;
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
        [YesOrNo.DO_NOT_KNOW]?: string;
    };
}

function FormikYesOrNoQuestion<FieldName>({
    name,
    includeDoNotKnowOption,
    labels,
    useTwoColumns = true,
    ...restProps
}: FormikYesOrNoQuestionProps<FieldName> & TypedFormInputCommonProps) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei', doNotKnow: doNotKnowLabel = 'Vet ikke' } = labels || {};
    return (
        <FormikRadioPanelGroup<FieldName>
            radios={[
                { label: yesLabel, value: YesOrNo.YES },
                { label: noLabel, value: YesOrNo.NO },
                ...(includeDoNotKnowOption ? [{ label: doNotKnowLabel, value: YesOrNo.DO_NOT_KNOW }] : []),
            ]}
            {...restProps}
            name={name}
            useTwoColumns={includeDoNotKnowOption ? false : useTwoColumns}
        />
    );
}

export default FormikYesOrNoQuestion;
