import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreatePersonaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
    @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
    @MaxLength(20, { message: 'El campo usuario no debe ser mayor a 20 caracteres' })
    readonly usuario: string;


    @ApiProperty()
    @IsNotEmpty({ message: 'El campo tipoPersona no debe ser vacío' })
    @IsString({ message: 'El campo tipoPersona debe ser de tipo cadena' })
    @MaxLength(20, { message: 'El campo tipoPersona no debe ser mayor a 20 caracteres' })
    readonly tipoPersona: string;


    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(20, { message: 'El campo nombre no debe ser mayor a 20 caracteres' })
    readonly nombre: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo apellido no debe ser vacío' })
    @IsString({ message: 'El campo apellido debe ser de tipo cadena' })
    @MaxLength(20, { message: 'El campo apellido no debe ser mayor a 20 caracteres' })
    readonly apellido: string;

  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
    @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
    @MaxLength(50, { message: 'El campo direccion no debe ser mayor a 50 caracteres' })
    readonly direccion: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
    @IsEmail({}, { message: 'El campo email debe ser un email válido' })
    @MaxLength(30, { message: 'El campo email no debe ser mayor a 50 caracteres' })
    readonly email: string;
}