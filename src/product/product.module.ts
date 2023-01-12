import { FileModule } from './../file/file.module';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import {
  Attribute,
  AttributeSchema,
  Category,
  CategorySchema,
  Product,
  ProductSchema,
} from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AttributeService } from './attribute.service';
import { MulterModule } from '@nestjs/platform-express/multer';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributeSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
    AuthModule,
    UserModule,
    FileModule,
  ],
  controllers: [ProductController],
  providers: [AttributeService, CategoryService, ProductService],
})
export class ProductModule {}
