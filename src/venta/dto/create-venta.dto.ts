import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateVentaDto {
    @ApiProperty()
    @IsDefined({ message: 'El campo idProducto debe estar definido' })
    @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
    readonly idProducto: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo cantidad debe estar definido' })
    @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
    readonly cantidad: number; 
    
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precio no debe ser vacío' })
    @IsString({ message: 'El campo precio debe ser de tipo cadena' })
    @MaxLength(30, { message: 'El campo precio no debe ser mayor a 30 caracteres' })
    readonly precio: string;  
    
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descuento no debe ser vacío' })
    @IsString({ message: 'El campo descuento debe ser de tipo cadena' })
    @MaxLength(30, { message: 'El campo descuento no debe ser mayor a 30 caracteres' })
    readonly descuento: string;

}
