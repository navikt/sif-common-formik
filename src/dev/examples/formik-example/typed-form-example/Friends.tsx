import { FieldArray } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import { FormikInput } from '../../../../typed-formik-form';
import { getStringValidator } from '../../../../typed-formik-form/validation';
import Box from '../../../components/box/Box';
import Question from '../../../components/question/Question';
import { Friend } from '../types';
import Siblings from './Siblings';

interface Props {
    fieldName: string;
    friends: Friend[];
}

const Friends: React.FunctionComponent<Props> = ({ fieldName, friends }) => (
    <FieldArray
        name={fieldName}
        render={(arrayHelpers) => (
            <div>
                {friends &&
                    friends.length > 0 &&
                    friends.map((_friend, index) => {
                        return (
                            <div key={index}>
                                <Panel border={true}>
                                    <Question>
                                        <FormikInput
                                            type="text"
                                            label="Fornavn"
                                            name={`${fieldName}.${index}.name` as any}
                                            validate={getStringValidator({ required: true })}
                                        />
                                    </Question>
                                    <fieldset>
                                        <legend>Søsken</legend>
                                        <Siblings fieldName={`${fieldName}.${index}.siblings`} friend={_friend} />
                                    </fieldset>
                                </Panel>
                            </div>
                        );
                    })}
                <Box margin="l">
                    <Knapp
                        htmlType="button"
                        mini={true}
                        onClick={() => arrayHelpers.push({ name: 'bac', siblings: [] })}>
                        Legg til en venn
                    </Knapp>
                </Box>
            </div>
        )}
    />
);

export default Friends;
