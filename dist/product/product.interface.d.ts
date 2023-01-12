import { IRaw } from './product.model';
export interface ICreateAttribute {
    name: string;
    meaning: {
        KZ: string;
        RU: string;
        EN: string;
    };
    attribute: IAttribute[];
}
export interface IAttribute {
    value: {
        value_RU: string;
        value_KZ: string;
        value_EN: string;
    };
    label: string;
    type: string;
}
export interface IProduct {
    image: string[];
    title: IRaw;
    prise: number;
    category: string;
    attribute: IRaw[];
    inStock: boolean;
    hit: boolean;
    discont: number;
    description: IRaw;
}
