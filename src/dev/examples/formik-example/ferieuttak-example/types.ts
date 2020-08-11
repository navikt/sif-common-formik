export interface Ferieuttak {
    id?: string;
    fom: Date;
    tom: Date;
    land: Ferieland[];
}

export const isFerieuttak = (ferieuttak: Partial<Ferieuttak>): ferieuttak is Ferieuttak => {
    return ferieuttak.fom !== undefined && ferieuttak.tom !== undefined && ferieuttak.land !== undefined;
};

export enum Ferieland {
    'Norge' = 'norge',
    'Sverige' = 'sverige',
    'Danmark' = 'danmark',
}
