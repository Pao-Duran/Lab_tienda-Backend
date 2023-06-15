import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PersonaEntity } from './entities/persona.entity';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('personas')
@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @ApiCreatedResponse({ type: PersonaEntity })
  @ApiOperation ({ summary: 'Crea una nueva persona'})
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get()
  @ApiOkResponse({ type: PersonaEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de personas'})
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PersonaEntity })
  @ApiOperation({ summary: 'Obtiene una persona con base al identificador'})
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PersonaEntity })
  @ApiOperation({ summary: 'Actualiza los datos de una persona con base al identificador'})
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina una persona con base al identificador'})
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
