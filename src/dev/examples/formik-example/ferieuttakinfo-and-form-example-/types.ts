export interface Ferieuttak {
    id?: string;
    land: Ferieland[];
}

export const isFerieuttak = (ferieuttak: Partial<Ferieuttak>): ferieuttak is Ferieuttak => {
    return ferieuttak.land !== undefined;
};

export enum Ferieland {
    'Norge' = 'norge',
    'Sverige' = 'sverige',
    'Danmark' = 'danmark',
}
