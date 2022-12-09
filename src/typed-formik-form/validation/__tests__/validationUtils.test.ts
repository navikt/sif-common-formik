import { stringContainsCharacters } from '../validationUtils';

describe('validationUtils', () => {
    describe('stringContainsCharacters', () => {
        it('returns false when character not found', () => {
            expect(stringContainsCharacters('123', ['5'])).toBeFalsy();
        });
        it('returns true when character is found', () => {
            expect(stringContainsCharacters('123', ['1'])).toBeTruthy();
        });
    });
});
