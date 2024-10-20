import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreatePostDto{
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title : string

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description : string

  @IsInt()
  @IsNotEmpty()
  userId : number
}