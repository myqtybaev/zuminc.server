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
    value_RU: string; // Найменование на РУССКОМ
    value_KZ: string; // Найменование на КАЗАХСКОМ
    value_EN: string; // Найменование на АНЛИЙСКОМ
  };
  label: string; // Ярлык
  type: string; // Тип
}

export interface IProduct {
  image: string[]; //Картинки

  title: IRaw; // Название товара
  prise: number; // Цена товара
  category: string; // Категория товара
  attribute: IRaw[]; // Атрибуты
  inStock: boolean; // В наличий
  hit: boolean;
  discont: number; // Скидка

  description: IRaw; // Описание
}
