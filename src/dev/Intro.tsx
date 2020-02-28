import React from 'react';
import PageIntro from './components/page-intro/PageIntro';

interface Props {}

const Intro: React.FunctionComponent<Props> = (props) => (
    <>
        <PageIntro title="sif-common-formik">
            Samling av komponenter som wrapper nav-frontend-skjema elementer med formik context.
        </PageIntro>
    </>
);

export default Intro;
