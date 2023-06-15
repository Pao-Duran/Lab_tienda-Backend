import { ProductoEntity } from "src/producto/entities/producto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('categorias')
export class CategoriaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idProducto' })
  idProducto: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  descripcion: string;

  @Column({ name: 'fecha_lanzamiento' })
  fechaLanzamiento: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

@ManyToOne(() => ProductoEntity, (producto) => producto.categoria)
@JoinColumn({name: 'idProducto', referencedColumnName: 'id'})
producto: ProductoEntity;
}
