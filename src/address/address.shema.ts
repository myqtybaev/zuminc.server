import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ unique: true, required: true })
  country: string;
  @Prop()
  city: string[];
}

export const AddressSchema = SchemaFactory.createForClass(Address);
