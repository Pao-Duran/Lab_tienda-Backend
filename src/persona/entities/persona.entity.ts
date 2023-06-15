import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('personas')
export class PersonaEntity {
@PrimaryGeneratedColumn()
  id: number;

  @Column({length:20})
    usuario: string;
  
  @Column({ length: 20 })
  tipoPersona: string;

  @Column({ length: 20 })
  nombre: string;

  @Column({ length: 20 })
  apellido: string;

  @Column({ length: 50 })
  direccion: string;

  @Column({length:30})
  email: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
}
