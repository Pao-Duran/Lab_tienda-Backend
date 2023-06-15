import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { VentaEntity } from "src/venta/entities/venta.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('productos')
export class ProductoEntity {

    @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombreArticulo: string;

  @Column({ length: 30 })
  marca: string;

  @Column()
  precio: number;
  
  @Column( {length: 500})
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

   @OneToMany(() => CategoriaEntity, categoria => categoria.producto)
   categoria: CategoriaEntity[];

   @OneToMany(() => VentaEntity, venta => venta.producto)
   venta: VentaEntity[];


}
