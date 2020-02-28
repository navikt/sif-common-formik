import React from 'react';
import { QuestionVisibilityContext } from './QuestionVisibilityContext';

interface Props<FormFields> {
    fieldName: FormFields;
    children: React.ReactNode;
}

function VisibilityBlock<FormFields>({ fieldName, children }: Props<FormFields>) {
    return (
        <QuestionVisibilityContext.Consumer>
            {(value) => <>{value?.visibility.isVisible(fieldName) && <>{children}</>}</>}
        </QuestionVisibilityContext.Consumer>
    );
}

export default VisibilityBlock;
