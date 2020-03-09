import React from 'react';
import moment from 'moment';
import { Panel } from 'nav-frontend-paneler';
import 'nav-frontend-tabs-style';
import TypedFormikWrapper from '../../../typed-formik-form/components/typed-formik-wrapper/TypedFormikWrapper';
import PageIntro from '../../components/page-intro/PageIntro';
import TypedFormExample from './typed-form-example/TypedFormExample';
import { FormValues } from './types';

interface Props {}

const initialValues: FormValues = {
    ferieuttak: [
        {
            id: '1',
            fom: new Date(),
            tom: moment()
                .add(1, 'month')
                .toDate()
        },
        {
            id: '2',
            fom: moment()
                .add(1, 'month')
                .toDate(),
            tom: moment()
                .add(2, 'month')
                .toDate()
        }
    ]
};

const FormikExample: React.FunctionComponent<Props> = () => {
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
