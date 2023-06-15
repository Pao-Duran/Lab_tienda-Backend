import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { VentaEntity } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VentaEntity])],
  controllers: [VentaController],
  providers: [VentaService]
})
export class VentaModule {}
