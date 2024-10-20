import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class GroupPostCreate{
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title : string

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description : string

  @IsNumber({},{each:true})
  @IsNotEmpty({each:true})
  @IsArray()
  @ArrayNotEmpty()
  userIds : number[]
}