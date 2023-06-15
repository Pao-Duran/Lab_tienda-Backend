import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VentaEntity } from './entities/venta.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)

@ApiTags('ventas')
@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  @ApiCreatedResponse({ type: VentaEntity })
  @ApiOperation({ summary: 'Crea una nueva venta'})
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  @ApiOkResponse({ type: VentaEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de categorias'})
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VentaEntity })
  @ApiOperation({ summary: 'Obtiene una venta con base al identificador'})
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VentaEntity })
  @ApiOperation({ summary: 'Actualiza los datos de una venta con base al identificador'})
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina una venta con base al identificador'})
  remove(@Param('id') id: string) {
    return this.ventaService.remove(+id);
  }
}
