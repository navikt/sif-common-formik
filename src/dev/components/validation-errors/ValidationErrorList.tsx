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
}

const ValidationErrorList = ({ errors }: Props) => {
    return (
        <Box margin="l">
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
    );
};

export default ValidationErrorList;
