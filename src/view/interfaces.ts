import p5 from 'p5';

export interface ITranslation {
    translate(v: p5.Vector): p5.Vector;
    zoom_factor: number;
}

export type ITranslationFunction = () => ITranslation;