import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() usuario: string;
  //@Column() clave: string;
  @Column({ select: false }) clave: string;
  @Column() email: string;
  @Column() rol: string;
  @Column() premium: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    if (this.clave && !/^\$2a\$\d+\$/.test(this.clave)) {
      this.clave = await bcrypt.hash(this.clave, salt);
    }
  }

  validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.clave);
  }
}
