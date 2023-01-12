import { CategoryDto } from './dto/category.dto';
import {
  Attribute,
  AttributeDocument,
  Category,
  CategoryDocument,
} from './product.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Attribute.name)
    private attributeModel: Model<AttributeDocument>,
  ) {}

  async findAllCategory() {
    //Получение всех атрибутов
    return await this.categoryModel.find();
  }
  async findOneCategory(id: string) {
    //Пойск по id
    const category = await this.categoryModel.findById(id);

    return await this.categoryModel.findById(id);
  }
  async createCategory(dto: CategoryDto) {
    //Создание атрибута

    //Проверка ярлыка
    const candidate = await this.categoryModel.findOne({
      name: dto.name,
    });
    if (candidate) {
      throw new HttpException('Ярлык занято', HttpStatus.BAD_REQUEST);
    }

    //Создание атрибута
    const category = new this.categoryModel({ ...dto });

    await category.save();
    return { message: 'Категория товаров создан', type: 'success' };
  }
  async updateCategory(dto: CategoryDto, id: string) {
    //Проверка ярлыка
    const candidate = await this.categoryModel.findOne({
      name: dto.name,
    });
    if (candidate && candidate.id !== id) {
      throw new HttpException('Ярлык занято', HttpStatus.BAD_REQUEST);
    }

    //сахранение изменений
    await this.categoryModel.findByIdAndUpdate(id, {
      ...dto,
    });
    return { message: 'Атрибут изменен', type: 'success' };
  }
  async destroyCategory(id: string) {
    //Удаление атрибута
    await this.categoryModel.findByIdAndDelete(id);
    return { message: 'Атрибут изменен', type: 'success' };
  }
}
