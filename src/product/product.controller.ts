import { CategoryDto } from './dto/category.dto';
import { ProductDto, ProductUpdateDto } from './dto/product.attribute.dto';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AttributeService } from './attribute.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IAttributeDTO } from './attribute.service';
import { RoleGuard } from 'src/role.guard';
@Controller('product')
export class ProductController {
  constructor(
    private attributeService: AttributeService,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}
  // @Get('editall')
  // editAll() {
  //   return this.productService.editAll();
  // }
  //Атрибуты
  @Get('attribute')
  findAllAttribute() {
    return this.attributeService.findAllAttribute();
  }

  @Get('attribute/ids=:id')
  findByIdsAttribute(@Param('id') id: string) {
    return this.attributeService.findByIdsAttributes(id.split(','));
  }
  @Get('attribute/:id')
  findByIdAttribute(@Param('id') id: string) {
    return this.attributeService.findOneAttribute(id);
  }
  @UseGuards(AuthGuard)
  @Post('attribute')
  createAttribute(@Body() dto: IAttributeDTO) {
    return this.attributeService.createAttribute(dto);
  }
  @UseGuards(AuthGuard)
  @Put('attribute/:id')
  updateAttribute(@Body() dto: IAttributeDTO, @Param('id') id: string) {
    return this.attributeService.updateAttribute(dto, id);
  }
  @UseGuards(AuthGuard)
  @Delete('attribute/:id')
  destroyAttribute(@Param('id') id: string) {
    return this.attributeService.destroyAttribute(id);
  }

  //Категорий
  @Get('category')
  findAllCategory() {
    return this.categoryService.findAllCategory();
  }
  @Get('category/:id')
  findByIdCategory(@Param('id') id: string) {
    return this.categoryService.findOneCategory(id);
  }
  @Post('category')
  createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }
  @Put('category/:id')
  updateCategory(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.updateCategory(dto, id);
  }
  @Delete('category/:id')
  destroyCategory(@Param('id') id: string) {
    return this.categoryService.destroyCategory(id);
  }

  //Товары
  @Get('/')
  findAllProduct(@Query() query: object) {
    console.log('query', query);
    return this.productService.findCountProduct(query);
  }

  @Get('/id=:id')
  findByIdProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }
  @Get('/param=:param')
  getParam(@Param('param') param: string) {
    return this.productService.findParam(param);
  }
  @Get('update=:id')
  findUpdateProduct(@Param('id') id: string) {
    return this.productService.findUpdateProduct(id);
  }
  @Post('/')
  createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }
  @Put('/id=:id')
  updateProduct(@Body() dto: ProductUpdateDto, @Param('id') id: string) {
    return this.productService.updateProduct(dto, id);
  }
  @Delete('/:id')
  destroyProduct(@Param('id') id: string) {
    return this.productService.destroyProduct(id);
  }
}
// export const imageFileFilter = (req, file, callback) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return callback(
//       new HttpException(
//         'Пожалуйста загрузите картинку!',
//         HttpStatus.BAD_REQUEST,
//       ),
//       false,
//     );
//   }
//   callback(null, true);
// };
// export const editFileName = (req, file, callback) => {
//   const name = file.originalname.split('.');
//   callback(null, `${Date.now()}${name[1]}`);
// };
