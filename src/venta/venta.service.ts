import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaEntity } from './entities/venta.entity';
import { Repository } from 'typeorm';


@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(VentaEntity)
    private ventaRepository: Repository<VentaEntity>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<VentaEntity> {
    const existe = await this.ventaRepository.findOneBy({
      idProducto: createVentaDto.idProducto,
      cantidad: createVentaDto.cantidad,
      precio: createVentaDto.precio.trim(),
      descuento: createVentaDto.descuento.trim(),

    });

    if (existe) {
      throw new ConflictException(
        `la venta ${createVentaDto.idProducto} ya existe para el producto.`,
      );
    }

    return this.ventaRepository.save({
      idProducto: createVentaDto.idProducto,
      cantidad: createVentaDto.cantidad,
      precio: createVentaDto.precio.trim(),
      descuento: createVentaDto.descuento.trim(),
    });
  }

  async findAll(): Promise<VentaEntity[]> {
    return this.ventaRepository.find({ relations: { producto: true } });
  }

  async findOne(id: number): Promise<VentaEntity> {
    const venta = await this.ventaRepository.findOne({ where: {id}, relations: {producto: true}});

    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe.`);
    }

    return venta;
  }


  async update(id: number, UpdateVentaDto: UpdateVentaDto) {
    const venta = await this.ventaRepository.findOneBy({id});

    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe.`);
    }

    const updateVentaDto = Object.assign(venta, UpdateVentaDto);
    return this.ventaRepository.save(updateVentaDto);
  }

  async remove(id: number) {
    const existe = await this.ventaRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`La venta ${id} no existe.`);
    }

    return this.ventaRepository.delete(id);
  }
}
