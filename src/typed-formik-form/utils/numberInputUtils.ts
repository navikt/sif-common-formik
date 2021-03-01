export const getNumberFromNumberInputValue = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '') {
        return undefined;
    }
    const value = `${inputValue}`.replace(/\,/g, '.');
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
