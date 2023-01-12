import { FileService } from './../file/file.service';
import { ProductDto, ProductUpdateDto } from './dto/product.attribute.dto';
import {
  Attribute,
  AttributeDocument,
  Category,
  CategoryDocument,
  Product,
  ProductDocument,
} from './product.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export interface IPage {
  _id: string;
  image: string[]; //Картинки
  title: string; // Название товара
  prise: number; // Цена товара
  category: {
    _id: string;
    value: string;
    label: string;
  }; // Категория товара
  attribute: object[]; // Атрибуты
  inStock: boolean; // В наличий
  hit: boolean;
  discont: number; // Скидка
  description: string; // Описание
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Attribute.name)
    private attributeModel: Model<AttributeDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private fileService: FileService,
  ) {}
  // async editAll() {
  //   //Редактирование под новую модель
  //   try {
  //     const allAttr = await this.attributeModel.find();
  //     const allCategory = await this.categoryModel.find();
  //     const products = await this.productModel.find();
  //     allAttr.forEach(async (item: any, i: number) => {
  //       let elem = { ...item };
  //       const body = {
  //         meaning: {
  //           RU: elem._doc.value,
  //           KZ: elem._doc.value,
  //           EN: elem._doc.value,
  //         },
  //         name: elem._doc.label,
  //         type: elem._doc.type,
  //       };
  //       console.log(JSON.stringify(body));

  //       await this.attributeModel.replaceOne({ _id: item._id }, body);
  //     });
  //     allCategory.forEach(async (item: any) => {
  //       let elem = { ...item };
  //       const body = {
  //         meaning: {
  //           RU: elem._doc.value,
  //           KZ: elem._doc.value,
  //           EN: elem._doc.value,
  //         },
  //         name: elem._doc.label,
  //         attribute: elem._doc.attribute,
  //       };

  //       await this.categoryModel.replaceOne({ _id: item.id }, body);
  //     });
  //     products.forEach(async (item: any) => {
  //       let elem = { ...item };
  //       const body = {
  //         title: {
  //           RU: elem._doc.title,
  //           KZ: elem._doc.title,
  //           EN: elem._doc.title,
  //         },
  //         description: {
  //           RU: elem._doc.description,
  //           KZ: elem._doc.description,
  //           EN: elem._doc.description,
  //         },
  //         image: elem._doc.image,
  //         prise: elem._doc.prise,
  //         category: elem._doc.category,
  //         attribute: elem._doc.attribute.map((item) => ({
  //           _id: item._id,
  //           value: { RU: item.value, KZ: item.value, EN: item.value },
  //         })),
  //         inStock: elem._doc.inStock || false,
  //         hit: elem._doc.inStock || false,
  //         discont: elem._doc.discont || 0,
  //       };

  //       await this.productModel.replaceOne({ _id: item._id }, body);
  //     });
  //     return true;
  //   } catch (e) {
  //     return e;
  //   }
  // }
  async findAllProduct() {
    //Получение всех атрибутов

    return await this.productModel.find();
  }
  async findParam(param: string) {
    if (param === 'news') {
      return await this.productModel.find().sort({ _id: -1 }).limit(10);
    }
    if (param === 'hit') {
      return await this.productModel.find({ hit: true }).limit(10);
    }
    if (param === 'discont') {
      return await this.productModel.find({ discont: { $gte: 1 } }).limit(10);
    }
  }
  async findCountProduct(query: any) {
    //получение товаров
    let obj = {};

    if (query.category) {
      const { id } = await this.categoryModel.findOne({
        name: query.category,
      });
      query.category = id;
    }

    return {
      product: await this.productModel
        .find({ ...query, ...obj })
        .sort({ _id: -1 })
        .skip((query?.count || 0) * 30)
        .limit(30),
      count: await this.productModel.find({ ...query, ...obj }).count(),
      query: obj,
    };
  }
  async findUpdateProduct(id: string) {
    //Обновление товара
    const product = await this.productModel.findById(id);
    return product;
  }
  async findOneProduct(id: string) {
    //Пойск по id
    const product: any = await this.productModel.findById(id).exec();
    const category = await this.categoryModel.findById(product.category).exec();
    let attributes: any = await this.attributeModel.find({
      $inc: [...product.attribute.map((item) => item._id)],
    });

    attributes = attributes.map((item) => {
      let obj = {
        meaning: { ...item.meaning },
        name: item.name,
        type: item.type,
        value: product.attribute.find((elem) => elem._id === item.id)?.value,
      };
      console.log(obj);
      return obj;
    });

    attributes = attributes.filter((item) => item !== null);
    product.category = category;
    product.attribute = attributes;

    return product;
  }

  async createProduct(dto: ProductDto) {
    //Создание товара

    dto.image = await this.fileService.createImage(dto.image);

    const product = new this.productModel(dto);
    await product.save();
    console.log(product);

    // await product.save();
    return { message: 'Nоваров создан', type: 'success' };
  }
  async updateProduct(dto: ProductUpdateDto, id: string) {
    let newImage: string[] = await this.fileService.createImage(dto.image);
    let image = [...dto.old, ...newImage];
    //сахранение изменений
    await this.productModel.findByIdAndUpdate(id, {
      ...dto,
      image,
    });
    return { message: 'Атрибут изменен', type: 'success' };
  }
  async destroyProduct(id: string) {
    //Удаление атрибута
    const product = await this.productModel.findByIdAndDelete(id);
    return { message: 'Удален', type: 'success' };
  }
}
