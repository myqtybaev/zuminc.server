import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IAttribute } from './attribute.service';

export type AttributeDocument = Attribute & Document;

@Schema()
export class Attribute {
  @Prop()
  name: string; //Ярдллык
  @Prop(
    raw({
      KZ: { type: String },
      RU: { type: String },
      EN: { type: String },
    }),
  )
  meaning: {
    KZ: string;
    RU: string;
    EN: string;
  }; //Найменование
  @Prop()
  type: string; //Тип
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);

export interface ICategory {
  _id: string;
  name: string;
  meaning: {
    KZ: string;
    RU: string;
    EN: string;
  };
  attribute: IAttribute[];
}

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string; //Ярдллык
  @Prop(
    raw({
      KZ: { type: String },
      RU: { type: String },
      EN: { type: String },
    }),
  )
  meaning: {
    KZ: string;
    RU: string;
    EN: string;
  }; //Найменование
  @Prop({ required: true })
  attribute: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  image: string[]; //Картинки
  @Prop(
    raw({
      RU: {
        type: String,
        required: true,
      },
      KZ: {
        type: String,
        required: true,
      },
      EN: {
        type: String,
        required: true,
      },
    }),
  )
  title: IRaw; // Название товара
  @Prop({ required: true })
  prise: number; // Цена товара
  @Prop({ required: true, type: Types.ObjectId })
  category: string; // Категория товара
  @Prop({ required: true, type: Array })
  attribute: IRaw[]; // Атрибуты
  @Prop({ default: true })
  inStock: boolean; // В наличий
  @Prop({ default: false })
  hit: boolean;
  @Prop({ default: 0 })
  discont: number; // Скидка
  @Prop(
    raw({
      RU: {
        type: String,
        required: true,
      },
      KZ: {
        type: String,
        required: true,
      },
      EN: {
        type: String,
        required: true,
      },
    }),
  )
  description: IRaw; // Описание
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export interface IRaw {
  RU: string;
  KZ: string;
  EN: string;
}

export interface IProductAttribute {
  _id: string;
  value: IRaw;
}
