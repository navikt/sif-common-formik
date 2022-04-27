import React, { forwardRef } from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import { TestProps } from '../../../types';

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(
    props: SkjemaGruppeProps & TestProps,
    ref: React.Ref<any>
) {
    const { legend, feil, tag, children, className, id, description, ...rest } = props;

    const isFieldsetTag = tag === undefined || tag === 'fieldset';
    const titleId = `${id || guid()}__title`;
    const renderLabelDirectly = isFieldsetTag === false && legend;

    return (
        <SkjemaGruppe
            ref={ref}
            tabIndex={id ? -1 : undefined}
            id={id}
            className={`${className ? className : ''} singleInputWrapper`}
            tag={tag ? tag : legend ? 'fieldset' : 'div'}
            feil={feil}
            role={isFieldsetTag ? undefined : 'group'}
            legend={isFieldsetTag ? legend ? <Element tag="div">{legend}</Element> : undefined : undefined}
            {...rest}
            {...(renderLabelDirectly === false ? { description } : undefined)}>
            {renderLabelDirectly && (
                <>
                    <div className="skjemaelement__label divLegend" id={titleId}>
                        {legend}
                    </div>
                    {description && <div className="skjemagruppe__description">{description}</div>}
                </>
            )}
            {children}
        </SkjemaGruppe>
    );
});

export default SkjemagruppeQuestion;
