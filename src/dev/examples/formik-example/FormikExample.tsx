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
            tom: dayjs().utc().add(1, 'month').toDate(),
            land: [],
        },
        {
            id: '2',
            fom: dayjs().utc().add(1, 'month').toDate(),
            tom: dayjs().utc().add(2, 'month').toDate(),
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
                <p>Skjemaet her er mest brukt som arbeidsflate for å teste komponentene under utvikling.</p>
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
