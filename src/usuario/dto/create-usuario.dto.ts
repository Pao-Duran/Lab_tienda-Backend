import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
  @IsString({ message: 'El campo usuario debe ser una cadena' })
  @MaxLength(10, {
    message: 'El campo usuario debe ser menor a 10 caracteres',
  })
  usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  @IsEmail({},{ message: 'El campo email debe no tiene el formato correcto' })
  @MaxLength(60, {
    message: 'El campo email debe ser menor a 60 caracteres',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo rol no debe ser vacío' })
  @IsString({ message: 'El campo rol debe ser una cadena' })
  @MaxLength(20, {
    message: 'El campo rol debe ser menor a 20 caracteres',
  })
  rol: string;

  @ApiProperty()
  @IsNumber({ }, { message: 'El campo premium debe ser un entero' })
  premium: number;
}
