import React from 'react';
import { TestProps, TypedFormInputValidationProps, YesOrNo } from '../../types';
import FormikRadioPanelGroup, { FormikRadioPanelGroupProps } from '../formik-radio-panel-group/FormikRadioPanelGroup';

export interface FormikYesOrNoQuestionProps<FieldName, ErrorType>
    extends TestProps,
        Omit<FormikRadioPanelGroupProps<FieldName, ErrorType>, 'radios'> {
    includeDoNotKnowOption?: boolean;
    useTwoColumns?: boolean;
    labels?: {
        [YesOrNo.YES]?: string;
        [YesOrNo.NO]?: string;
        [YesOrNo.DO_NOT_KNOW]?: string;
    };
}

function FormikYesOrNoQuestion<FieldName, ErrorType>({
    name,
    includeDoNotKnowOption,
    labels,
    useTwoColumns = true,
    ...restProps
}: FormikYesOrNoQuestionProps<FieldName, ErrorType> & TypedFormInputValidationProps<FieldName, ErrorType>) {
    const { yes: yesLabel = 'Ja', no: noLabel = 'Nei', doNotKnow: doNotKnowLabel = 'Vet ikke' } = labels || {};
    const testKey = restProps['data-testid'];
    delete restProps['data-testid'];

    return (
        <FormikRadioPanelGroup<FieldName, ErrorType>
            data-testid={testKey}
            radios={[
                { label: yesLabel, value: YesOrNo.YES, ['data-testid']: testKey ? `${testKey}_yes` : undefined },
                { label: noLabel, value: YesOrNo.NO, ['data-testid']: testKey ? `${testKey}_no` : undefined },
                ...(includeDoNotKnowOption ? [{ label: doNotKnowLabel, value: YesOrNo.DO_NOT_KNOW }] : []),
            ]}
            {...restProps}
            name={name}
            useTwoColumns={includeDoNotKnowOption ? false : useTwoColumns}
        />
    );
}

export default FormikYesOrNoQuestion;
