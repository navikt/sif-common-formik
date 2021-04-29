import { Element } from 'nav-frontend-typografi';
import React from 'react';
import Box from '../box/Box';
import './validationErrorList.less';

interface ValidationErrorInfo {
    info: string;
    example?: string;
}

export type ValidationErrors = {
    [key: string]: ValidationErrorInfo;
};

interface Props {
    errors: ValidationErrors;
    title: string;
}

const ValidationErrorList = ({ errors, title }: Props) => {
    return (
        <Box margin="xl">
            {title && <Element tag="h4">{title}</Element>}
            <Box margin="m">
                <table className="validationErrorList">
                    <thead>
                        <tr>
                            <th>Feil</th>
                            <th>Beskrivelse</th>
                            <th>Eksempel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(errors).map((key) => {
                            return (
                                <tr key={key}>
                                    <th>
                                        <code>{key}</code>
                                    </th>
                                    <td key="info">{errors[key].info}</td>
                                    <td key="example">{errors[key].example}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default ValidationErrorList;
