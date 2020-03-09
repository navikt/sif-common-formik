import React, { useState } from 'react';
import { FormikProps } from 'formik';
import Tabs from 'nav-frontend-tabs';
import 'nav-frontend-tabs-style';
import TypedFormikWrapper from '../../../typed-formik-form/components/typed-formik-wrapper/TypedFormikWrapper';
import Comp from '../../components/code/Comp';
import PageIntro from '../../components/page-intro/PageIntro';
import FormWithConfig from './FormWithConfig';
import FormWithTypedFormElements from './FormWithTypedFormElements';
import { FormValues } from './types';

interface Props {}

const initialValues: FormValues = {
    ferieuttak: [
        {
            country: 'Sverige'
        },
        {
            country: 'Danmark'
        }
    ]
};

const FormikExample: React.FunctionComponent<Props> = (props) => {
    const [view, setView] = useState(0);
    return (
        <>
            <PageIntro title="Skjemaeksempel">
                De mest brukte skjemakomponentene, og eksempel på hvordan en setter opp validering. Se kildekode for
                hvordan det settes opp.
            </PageIntro>

            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={(formik: FormikProps<FormValues>) => (
                    <>
                        <Tabs
                            onChange={(evt, idx) => setView(idx)}
                            tabs={[
                                {
                                    label: 'Typed form components',
                                    aktiv: view === 0
                                },
                                {
                                    label: 'Skjema med config',
                                    aktiv: view === 1
                                }
                            ]}
                        />
                        {view === 0 && <FormWithTypedFormElements />}
                        {view === 1 && <FormWithConfig formik={formik} />}
                    </>
                )}
            />
        </>
    );
};

export default FormikExample;
