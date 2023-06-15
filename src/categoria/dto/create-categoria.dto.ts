import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";




export class CreateCategoriaDto {
    @ApiProperty()
    @IsDefined({ message: 'El campo idProducto debe estar definido' })
    @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
    readonly idProducto: number;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(100, {
      message: 'El campo nombre no debe ser mayor a 100 caracteres',
    })
    readonly nombre: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(100, {
      message: 'El campo descripcion no debe ser mayor a 100 caracteres',
    })
    readonly descripcion: string;

    @ApiProperty()
    @IsDefined({ message: 'El campo fechaLanzamiento debe estar definido' })
    @IsDateString({}, { message: 'El campo fechaLanzamiento debe ser de tipo fecha' })
    readonly fechaLanzamiento: Date;
}
