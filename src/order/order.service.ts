import { MailService } from './../mail/mail.service';
import { OrderDto } from './dto/order.dto';
import { OrderDocument } from './order.shema';
import { Order } from './order';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private model: Model<OrderDocument>,
    private mail: MailService,
  ) {}
  async create(dto: OrderDto, id: string) {
    // Создать продажу
    const order = new this.model({
      ...dto,
      userId: id,
    });
    await order.save();
    return order;
  }
  async edit(type: string, text: string, id: string) {
    // Заказ редактирован
    if (type === 'Отправлен') {
      const order = await this.model.findById(id);
      await this.model.findByIdAndUpdate(id, { status: type });
      await this.mail.sendStatus(order.email, text);
      return { message: 'жетістік' };
    }
  }
  async findAll(count: number) {
    // Получение всех заявок
    const orders = await this.model
      .find()
      .sort({ _id: -1 })
      .skip(count * 30)
      .limit(30);
    const total = await this.model.find().count();
    return { data: orders, total };
  }
  async findUser(id: string) {
    const orders = await this.model.find({ userId: id });

    return orders;
  }
  async findById(id: string) {
    //пойск по id
    const order = await this.model.findById(id);
    return order;
  }
  async destroy(id: string) {
    //Удаление
    await this.model.findByIdAndDelete(id);
    return { message: 'success' };
  }
}
