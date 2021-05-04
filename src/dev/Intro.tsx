import React from 'react';
import PageIntro from './components/page-intro/PageIntro';

const Intro = () => (
    <>
        <PageIntro title="@navikt/sif-common-formik">
            <h2>Typed formik wrapper for nav-frontend-skjema + validering</h2>
            <p>
                Sett av skjema-komponenter laget for team brukerdialog i sykdom-i-familien. Komponentene gjør det
                enklere og raskere å sette opp skjemaløsninger hvor en bruker typescript, formik og nav-frontend-skjema,
                og som sørger for at oppførsel og utéendet blir likt på tvers av brukerdialogene. For flere detaljer, se
                kode.
            </p>

            <h3>Validering</h3>
            <p>
                Det er laget et sett med valideringsfunksjoner som en kan bruke sammen med skjemakomponentene. Disse
                finner du på{' '}
                <a href="#validering" className="lenke">
                    denne siden
                </a>
                .{' '}
            </p>
        </PageIntro>
    </>
);

export default Intro;
