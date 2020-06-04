import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import PageIntro from './components/page-intro/PageIntro';

interface Props {}

const Intro: React.FunctionComponent<Props> = (props) => (
    <>
        <PageIntro title="@navikt/sif-common-formik">
            <h2>Typed formik wrapper for nav-frontend-skjema</h2>
            <Ingress>
                Sett av skjema-komponenter laget for team brukerdialog i sykdom-i-familien. Komponentene gjør det
                enklere og raskere å sette opp skjemaløsninger hvor en bruker typescript, formik of nav-frontend-skjema,
                og som sørger for at oppførsel og utéendet blir likt på tvers av brukerdialogene.
            </Ingress>
            <h3>Kort hvordan det virker</h3>
            <ol>
                <li>
                    Definer alle felter i skjemaet som enums - <code>FieldNames</code>
                </li>
                <li>
                    Definer et interface for skjemaet: <code>FormValues</code>
                </li>
            </ol>
            <p> ... se kode for konkret eksempel</p>
        </PageIntro>
    </>
);

export default Intro;
