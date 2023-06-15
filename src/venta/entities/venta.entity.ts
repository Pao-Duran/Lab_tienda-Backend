import { ProductoEntity } from "src/producto/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";


@Entity('ventas')
export class VentaEntity {

 @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idProducto' })
  idProducto: number;

  @Column()
  cantidad: number;
  
  @Column()
  precio: string;

  @Column()
  descuento: string;

@ManyToOne(() => ProductoEntity, (producto) => producto.venta)
@JoinColumn({name: 'idProducto', referencedColumnName: 'id'})
producto: ProductoEntity;

}
