import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private repository: Repository<UsuarioEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    const usuario = new UsuarioEntity();
    Object.assign(usuario, createUsuarioDto);
    usuario.usuario = usuario.usuario.trim();
    usuario.clave = process.env.DEFAULT_PASSWORD;
    usuario.email = usuario.email.trim();
    usuario.rol = usuario.rol.trim();

    const newUsuario = await this.repository.save(usuario);
    delete newUsuario.clave;
    return newUsuario;
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    const existe = await this.repository.findOne({ where: { id } });
    if (!existe) throw new NotFoundException(`El usuario ${id} no existe.`);
    return existe;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioEntity> {
    const existe = await this.repository.findOne({ where: { id } });
    if (!existe) throw new NotFoundException(`El usuario ${id} no existe.`);

    // const updateUsuario = Object.assign(existe, updateUsuarioDto);

    // var usuario = await this.repository.save(updateUsuario);
    // delete usuario.clave;
    // return usuario;
    Object.assign(existe, updateUsuarioDto);
    return await this.repository.save(existe);
  }

  async remove(id: number): Promise<void> {
    const existe = await this.repository.findOne({ where: { id } });
    if (!existe) throw new NotFoundException(`El usuario ${id} no existe.`);

    await this.repository.delete(id);
  }

  async validate(usuario: string, clave: string): Promise<UsuarioEntity> {
    const usuarioOk = await this.repository.findOne({
      where: { usuario },
      select: ['id', 'usuario', 'clave', 'email', 'rol', 'premium'],
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');
    
    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    delete usuarioOk.clave;
    return usuarioOk;
  }
}
