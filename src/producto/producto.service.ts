import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoEntity } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<ProductoEntity> {
    const { nombreArticulo, marca } = createProductoDto;
    
    const existe = await this.productoRepository.findOne({
      where: { nombreArticulo: nombreArticulo.trim(), marca: marca.trim() },
    });

    if (existe) {
      throw new ConflictException(`El producto ${nombreArticulo} ya existe.`);
    }

    const producto = this.productoRepository.create(createProductoDto);

    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<ProductoEntity[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<ProductoEntity> {
    const producto = await this.findOne(id);
  
    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }
  
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<ProductoEntity> {
    const producto = await this.findOne(id);

    Object.assign(producto, updateProductoDto);

    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
  
    await this.productoRepository.remove(producto);
  }
}
