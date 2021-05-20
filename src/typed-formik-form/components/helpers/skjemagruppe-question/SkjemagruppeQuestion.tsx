import React, { forwardRef } from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(props: SkjemaGruppeProps, ref: React.Ref<any>) {
    const { legend, feil, tag, children, className, id, ...rest } = props;
    return (
        <SkjemaGruppe
            ref={ref}
            tabIndex={id ? -1 : undefined}
            id={id}
            className={`${className ? className : ''} singleInputWrapper`}
            tag={tag ? tag : legend ? 'fieldset' : 'div'}
            feil={feil}
            legend={legend ? <Element tag="div">{legend}</Element> : undefined}
            {...rest}>
            {children}
        </SkjemaGruppe>
    );
});

export default SkjemagruppeQuestion;
