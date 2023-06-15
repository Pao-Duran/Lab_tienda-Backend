import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriaEntity } from './entities/categoria.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoriaEntity })
  @ApiOperation({ summary: 'Crea una nueva categoria'})
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOkResponse({ type: CategoriaEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de categorias'})
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoriaEntity })
  @ApiOperation({ summary: 'Obtiene una categoria con base al identificador'})
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CategoriaEntity })
  @ApiOperation({ summary: 'Actualiza los datos de una categoria con base al identificador'})
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina una categoria con base al identificador'})
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
