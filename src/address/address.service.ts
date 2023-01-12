import { Address, AddressDocument } from './address.shema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDto } from './dto/address.dto';
@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private model: Model<AddressDocument>,
  ) {}

  async create(dto: AddressDto) {
    //Создание адресса
    const address = new this.model(dto);
    address.save();
    return { message: 'Адресс создан' };
  }
  async findAll() {
    //Получение всех адрессов
    const address = await this.model.find();
    return address;
  }
  async findById(id: string) {
    //Получение адресса по id
    const address = await this.model.findById(id);
    return address;
  }
  async update(dto: AddressDto, id: string) {
    //Редактирование адресса
    await this.model.findByIdAndUpdate(id, dto);
    return { message: 'Адресс изменен' };
  }
  async destroy(id: string) {
    //Удалить адресс
    await this.model.findByIdAndDelete(id);
    return { message: 'Адресс удален' };
  }
}
