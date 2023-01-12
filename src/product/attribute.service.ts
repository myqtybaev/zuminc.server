import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attribute, AttributeDocument } from './product.model';
export interface IAttribute {
  meaning: {
    RU: string; // Найменование на РУССКОМ
    KZ: string; // Найменование на КАЗАХСКОМ
    EN: string; // Найменование на АНЛИЙСКОМ
  };
  name: string; // Ярлык
  type: string; // Тип
}
export interface IAttributeDTO {
  meaning: {
    RU: string;
    KZ: string;
    EN: string;
  };
  name: string;
  type: string;
}
@Injectable()
export class AttributeService {
  constructor(
    @InjectModel(Attribute.name)
    private attributeModel: Model<AttributeDocument>,
  ) {}
  async findAllAttribute() {
    //Получение всех атрибутов
    return await this.attributeModel.find();
  }
  async findOneAttribute(id: string) {
    //Пойск по id
    return await this.attributeModel.findById(id);
  }
  async findByIdsAttributes(ids: string[]) {
    return await this.attributeModel.find({ _id: { $in: ids } });
  }
  async createAttribute(dto: IAttributeDTO) {
    //Создание атрибута

    //Проверка ярлыка
    const candidate = await this.attributeModel.findOne({
      name: dto.name,
    });
    if (candidate) {
      throw new HttpException('Ярлык занято', HttpStatus.BAD_REQUEST);
    }

    //Создание атрибута
    const attribute = new this.attributeModel({
      ...dto,
    });
    await attribute.save();
    return { message: 'Атрибут создан', type: 'success' };
  }

  async updateAttribute(dto: IAttributeDTO, id: string) {
    //Проверка ярлыка
    const candidateLabel = await this.attributeModel.findOne({
      name: dto.name,
    });
    if (candidateLabel && id !== candidateLabel.id) {
      throw new HttpException('Ярлык занято', HttpStatus.BAD_REQUEST);
    }
    //Редактирование атрибута
    const attribute = await this.attributeModel.findByIdAndUpdate(id, dto);

    return { message: 'Атрибут изменен', type: 'success' };
  }
  async destroyAttribute(id: string) {
    //Удаление атрибута
    const attribute = await this.attributeModel.findByIdAndDelete(id);
    return { message: 'Атрибут изменен', type: 'success' };
  }
}
