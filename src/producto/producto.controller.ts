import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductoEntity } from './entities/producto.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductoEntity })
  @ApiOperation({ summary: 'Crea un nuevo producto'})
  create(@Body() CreateProductoDto: CreateProductoDto) {
    return this.productoService.create(CreateProductoDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductoEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de productos'})
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductoEntity })
  @ApiOperation({ summary: 'Obtiene un producto con base al identificador'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductoEntity })
  @ApiOperation({ summary: 'Actualiza los datos de un producto con base al identificador'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInterpreteDto: UpdateProductoDto,
  ) {
    return this.productoService.update(id, updateInterpreteDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un producto con base al identificador'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.remove(id);
  }
}
