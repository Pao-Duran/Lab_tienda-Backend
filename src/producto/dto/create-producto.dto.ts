import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateProductoDto {


    @ApiProperty()
    @IsNotEmpty({ message: 'El campo codigo no debe ser vacío' })
    @IsString({ message: 'El campo codigo debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo codigo no debe ser mayor a 100 caracteres' })
    readonly codigo: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
    readonly nombreArticulo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo marca no debe ser vacío' })
    @IsString({ message: 'El campo marca debe ser de tipo cadena' })
    @MaxLength(30, { message: 'El campo marca no debe ser mayor a 30 caracteres' })
    readonly marca: string;
    
    @ApiProperty()
    @IsDefined({ message: 'El campo precio debe estar definido' })
    @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
    readonly precio: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(500, { message: 'El campo descripcion no debe ser mayor a 500 caracteres' })
    readonly descripcion: string;

}
