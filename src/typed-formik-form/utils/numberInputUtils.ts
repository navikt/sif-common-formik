export const getNumberFromNumberInputValue = (inputValue: string): number | undefined => {
    const value = (inputValue || '').replace(/\,/g, '.');
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
