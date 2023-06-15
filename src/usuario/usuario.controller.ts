import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsuarioEntity } from './entities/usuario.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('usuarios')

export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiCreatedResponse({ type: UsuarioEntity })
  @ApiOperation({ summary: 'Crea un nuevo usuario'})
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiOkResponse({ type: UsuarioEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de usuarios'})
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UsuarioEntity })
  @ApiOperation({ summary: 'Obtiene un usuario con base al identificador'})
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UsuarioEntity })
  @ApiOperation({ summary: 'Actualiza los datos de un usuario con base al identificador'})
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un usuario con base al identificador'})
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
