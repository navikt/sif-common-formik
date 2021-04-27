import React from 'react';
import { FieldArray } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import { FormikInput } from '../../../../typed-formik-form';
import { getStringValidator } from '../../../../typed-formik-form/validation';
import { ValidationError } from '../../../../typed-formik-form/validation/types';
import { hasValue } from '../../../../typed-formik-form/validation/validationUtils';
import Box from '../../../components/box/Box';
import Question from '../../../components/question/Question';
import { Friend } from '../types';

interface Props {
    fieldName: string;
    friend: Friend;
}

const Siblings: React.FunctionComponent<Props> = ({ fieldName, friend }) => {
    const { siblings } = friend;
    return (
        <FieldArray
            name={fieldName}
            render={(arrayHelpers) => (
                <div>
                    {siblings &&
                        siblings.length > 0 &&
                        siblings.map((_sibling, index) => (
                            <div key={index}>
                                <Question>
                                    <FormikInput
                                        type="text"
                                        label="Søskens navn"
                                        name={`${fieldName}.${index}.name` as any}
                                        validate={(values) => {
                                            const error = getStringValidator({ required: true })(values);
                                            if (error) {
                                                const intlErr: ValidationError = {
                                                    key: 'søskennavn.mangler',
                                                    values: {
                                                        navn: hasValue(friend.name) ? friend.name : ` venn ${index}`,
                                                    },
                                                };
                                                return intlErr;
                                            }
                                        }}
                                    />
                                </Question>
                            </div>
                        ))}
                    <Box>
                        <Knapp htmlType="button" mini={true} onClick={() => arrayHelpers.push('')}>
                            Legg til søsken
                        </Knapp>
                    </Box>
                </div>
            )}
        />
    );
};

export default Siblings;
