import React from 'react';
import dayjs from 'dayjs';
import Panel from 'nav-frontend-paneler';
import 'nav-frontend-tabs-style';
import TypedFormikWrapper from '../../../typed-formik-form/components/typed-formik-wrapper/TypedFormikWrapper';
import PageIntro from '../../components/page-intro/PageIntro';
import TypedFormExample from './typed-form-example/TypedFormExample';
import { FormValues } from './types';

const initialValues: FormValues = {
    ferieuttak: [
        {
            id: '1',
            fom: new Date(),
            tom: dayjs().add(1, 'month').toDate(),
            land: [],
        },
        {
            id: '2',
            fom: dayjs().add(1, 'month').toDate(),
            tom: dayjs().add(2, 'month').toDate(),
            land: [],
        },
    ],
    friends: [],
    letters: [],
};

const FormikExample = () => {
    return (
        <>
            <PageIntro title="@navikt/sif-common-formik">
                <h2>TypedFormExample</h2>
                Siden setter opp TypedFormikWrapper og setter type med generics. Se <code>TypedFormExample</code>. En
                kan også bruke <code>getTypedFormComponents</code>-util for å få ut alle skjemakomponentene typed
                direkte. Se <code>TypedFormExample</code>.
            </PageIntro>

            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={() => (
                    <Panel>
                        <TypedFormExample />
                    </Panel>
                )}
            />
        </>
    );
};

export default FormikExample;
