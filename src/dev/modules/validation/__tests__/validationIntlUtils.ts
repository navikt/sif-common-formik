import { FormikErrors } from 'formik';
import { getValidationErrorWithIntl } from '../validationIntlUtils';

interface SomeFields {
    field1: string;
    field2: number;
    field3: string;
}

let errors: FormikErrors<SomeFields>;

const intl: any = {
    formatMessage: ({ defaultMessage }: { defaultMessage: any }) => defaultMessage
};

describe('navFrontendUtils', () => {
    describe('getValidationErrorPropsWithIntl', () => {
        beforeEach(() => {
            errors = {
                field1: 'common.fieldvalidation.påkrevd',
                field2: 'common.fieldvalidation.påkrevd',
                field3: 'common.fieldvalidation.påkrevd'
            };
        });

        it('should return validation errors on format compatible with nav-frontend input components', () => {
            const field1Errors = getValidationErrorWithIntl(intl, errors, 'field1');
            const field2Errors = getValidationErrorWithIntl(intl, errors, 'field2');
            const field3Errors = getValidationErrorWithIntl(intl, errors, 'field3');
            expect(field1Errors).toEqual('common.fieldvalidation.påkrevd');
            expect(field2Errors).toEqual('common.fieldvalidation.påkrevd');
            expect(field3Errors).toEqual('common.fieldvalidation.påkrevd');
        });

        it('should return an empty object if there is no errors on the specified field name', () => {
            expect(getValidationErrorWithIntl(intl, errors, 'nonExistentField')).toBeUndefined();
        });
    });
});
