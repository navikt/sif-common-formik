import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Ferieuttak } from './types';

interface Props {
    ferieuttak: Ferieuttak;
}

const FerieuttakInfo: React.FunctionComponent<Props> = ({ ferieuttak }) => {
    return (
        <div>
            <Undertittel>Registrerte uttak av ferier</Undertittel>
            <ul>
                {ferieuttak.land.map((land, idx) => (
                    <li key={idx}>{land}</li>
                ))}
            </ul>
        </div>
    );
};

export default FerieuttakInfo;
