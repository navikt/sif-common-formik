import { FieldArray } from 'formik';
import React from 'react';
import { FormikInput } from '../../../../typed-formik-form';
import { getStringValidator } from '../../../../typed-formik-form/validation';
import { IntlErrorObject } from '../../../../typed-formik-form/validation/types';
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
                    {siblings && siblings.length > 0 ? (
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
                                                const intlErr: IntlErrorObject = {
                                                    key: 'abc',
                                                    isUniqueKey: true,
                                                };
                                                return intlErr;
                                            }
                                        }}
                                    />
                                </Question>
                                <button type="button" onClick={() => arrayHelpers.insert(index, '')}>
                                    +
                                </button>
                            </div>
                        ))
                    ) : (
                        <button type="button" onClick={() => arrayHelpers.push('')}>
                            Add a sibling
                        </button>
                    )}
                </div>
            )}
        />
    );
};

export default Siblings;
