import React from 'react';
import { PopoverOrientering } from 'nav-frontend-popover';
import { TypedFormInputCommonProps, YesOrNo } from '../../types';
import FormikRadioPanelGroup, { FormikRadioPanelGroupProps } from '../formik-radio-panel-group/FormikRadioPanelGroup';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';

export interface FormikYesOrNoQuestionProps<FieldName> extends Omit<FormikRadioPanelGroupProps<FieldName>, 'radios'> {
    includeDoNotKnowOption?: boolean;
    infoPlassering?: PopoverOrientering;
    useTwoColumns?: boolean;
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
    infoPlassering,
    useTwoColumns = true,
    info,
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
            legend={
                <LabelWithInfo infoPlassering={infoPlassering} info={info}>
                    {legend}
                </LabelWithInfo>
            }
            name={name}
            useTwoColumns={includeDoNotKnowOption ? false : useTwoColumns}
        />
    );
}

export default FormikYesOrNoQuestion;
