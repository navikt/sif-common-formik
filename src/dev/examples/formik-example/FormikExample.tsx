import React, { useState } from 'react';
import { FormikProps } from 'formik';
import { Panel } from 'nav-frontend-paneler';
import Tabs from 'nav-frontend-tabs';
import 'nav-frontend-tabs-style';
import { Undertittel } from 'nav-frontend-typografi';
import TypedFormikWrapper from '../../../typed-formik-form/components/typed-formik-wrapper/TypedFormikWrapper';
import Code from '../../components/code/Code';
import Comp from '../../components/code/Comp';
import PageIntro from '../../components/page-intro/PageIntro';
import FormWithConfig from './FormWithConfig';
import FormWithTypedFormElements from './FormWithTypedFormElements';
import { FormValues } from './types';

interface Props {}

const initialValues: FormValues = {};

const FormikExample: React.FunctionComponent<Props> = (props) => {
    const [view, setView] = useState(2);
    return (
        <>
            <PageIntro title="Skjemaeksempel">
                De mest brukte skjemakomponentene, og eksempel på hvordan en setter opp validering. Se kildekode for
                hvordan det settes opp.
            </PageIntro>
            <Comp title="<FormikWrapper>" isFormik={true}>
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
                                        label: 'Strukturoversikt',
                                        aktiv: view === 0
                                    },
                                    {
                                        label: 'Typed form components',
                                        aktiv: view === 1
                                    },
                                    {
                                        label: 'Skjema med config',
                                        aktiv: view === 2
                                    }
                                ]}
                            />
                            {view === 0 && (
                                <Comp title="<Steg>" isLayout={true}>
                                    <Code isLayout={true}>Stegindikator</Code>
                                    <Undertittel>
                                        <em>Custom content</em>
                                    </Undertittel>
                                    <Comp title="<FormikForm>" actions="onSubmit" isFormik={true}>
                                        <Panel>Skjemainputs</Panel>
                                        <Code isFormik={true}>FormikFormValidationSummary</Code>
                                        <Code isFormik={true}>FormikFormKnapperad</Code>
                                    </Comp>
                                    <p>
                                        <em>Custom content</em>
                                    </p>
                                    <Code>FortsettSenere</Code>
                                    <Code>AvbrytOgSlett</Code>
                                </Comp>
                            )}
                            {view === 1 && <FormWithTypedFormElements />}
                            {view === 2 && <FormWithConfig formik={formik} />}
                        </>
                    )}
                />
            </Comp>
        </>
    );
};

export default FormikExample;
