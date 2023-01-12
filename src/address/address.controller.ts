import { AddressDto } from './dto/address.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private service: AddressService) {}
  @Post('/')
  create(@Body() dto: AddressDto) {
    return this.service.create(dto);
  }
  @Get('/')
  findAll() {
    return this.service.findAll();
  }
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
  @Put('/:id')
  update(@Body() dto: AddressDto, @Param('id') id: string) {
    return this.service.update(dto, id);
  }
  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}
