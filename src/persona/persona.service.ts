import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaEntity } from './entities/persona.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(PersonaEntity)
    private personaRepository: Repository<PersonaEntity>,
  ) {}

   async create(
    createPersonaDto: CreatePersonaDto,
  ): Promise<PersonaEntity> {
    const existe = await this.personaRepository.findOneBy({
      usuario: createPersonaDto.usuario.trim(),
    });

    if (existe) {
      throw new ConflictException(`El usuario ${createPersonaDto.usuario} ya existe.`);
    }

    return this.personaRepository.save({
      usuario: createPersonaDto.usuario.trim(),
      tipoPersona: createPersonaDto.tipoPersona.trim(),
      nombre: createPersonaDto.nombre.trim(),
      apellido: createPersonaDto.apellido.trim(),
      direccion: createPersonaDto.direccion.trim(),
      email: createPersonaDto.email.trim(),
 
    });
  }


  async findAll(): Promise<PersonaEntity[]> {
    return this.personaRepository.find();
  }

  async findOne(id: number): Promise<PersonaEntity> {
    const usuario = await this.personaRepository.findOneBy({id});

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    return usuario;
  }


  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const usuario = await this.personaRepository.findOneBy({id});

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    const usuarioUpdate = Object.assign(usuario, updatePersonaDto);
    return this.personaRepository.save(usuarioUpdate);
  }

  async remove(id: number) {
    const existe = await this.personaRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    return this.personaRepository.delete(id);
  }
}
