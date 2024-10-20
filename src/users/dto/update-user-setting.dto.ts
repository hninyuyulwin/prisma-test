import { IsBoolean, IsOptional } from "class-validator"

export class UpdateUserSettingDto{
  @IsBoolean()
  @IsOptional()
  notificationOn ?: boolean

  @IsBoolean()
  @IsOptional()
  smsEnabled ?: boolean
}