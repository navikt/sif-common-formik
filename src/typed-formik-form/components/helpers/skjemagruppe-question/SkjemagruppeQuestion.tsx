import React, { forwardRef } from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(props: SkjemaGruppeProps, ref: React.Ref<any>) {
    const { legend, feil, tag, children, className, id, ...rest } = props;

    const isFieldsetTag = tag === undefined || tag === 'fieldset';
    const titleId = `${id || guid()}__title`;

    return (
        <SkjemaGruppe
            ref={ref}
            tabIndex={id ? -1 : undefined}
            id={id}
            className={`${className ? className : ''} singleInputWrapper`}
            tag={tag ? tag : legend ? 'fieldset' : 'div'}
            feil={feil}
            role={isFieldsetTag ? undefined : 'group'}
            aria-labelledby={isFieldsetTag && legend ? undefined : titleId}
            legend={isFieldsetTag ? legend ? <Element tag="div">{legend}</Element> : undefined : undefined}
            {...rest}>
            {isFieldsetTag === false && legend && (
                <div className="skjemaelement__label" id={titleId}>
                    {legend}
                </div>
            )}
            {children}
        </SkjemaGruppe>
    );
});

export default SkjemagruppeQuestion;
