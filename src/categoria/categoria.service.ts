import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { Repository } from 'typeorm';



@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaEntity> {
    const existe = await this.categoriaRepository.findOneBy({
      idProducto: createCategoriaDto.idProducto,
      nombre: createCategoriaDto.nombre.trim(),
      descripcion: createCategoriaDto.descripcion.trim(),

    });

    if (existe) {
      throw new ConflictException(
        `la categoria ${createCategoriaDto.nombre} ya existe para el producto.`,
      );
    }

    return this.categoriaRepository.save({
      idProducto: createCategoriaDto.idProducto,
      nombre: createCategoriaDto.nombre.trim(),
      descripcion: createCategoriaDto.descripcion.trim(),
      fechaLanzamiento: createCategoriaDto.fechaLanzamiento,
    });
  }

  async findAll(): Promise<CategoriaEntity[]> {
    return this.categoriaRepository.find({ relations: { producto: true } });
  }

  async findOne(id: number): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepository.findOne({ where: {id}, relations: {producto: true}});

    if (!categoria) {
      throw new NotFoundException(`El categoria ${id} no existe.`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.findOneBy({id});

    if (!categoria) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    const categoriaUpdate = Object.assign(categoria, UpdateCategoriaDto);
    return this.categoriaRepository.save(categoriaUpdate);
  }

  async remove(id: number) {
    const existe = await this.categoriaRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    return this.categoriaRepository.delete(id);
  }
}
