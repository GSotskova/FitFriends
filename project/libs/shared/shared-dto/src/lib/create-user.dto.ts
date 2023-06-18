import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsISO8601, IsString, MaxLength, MinLength } from 'class-validator';
import { StationMetro, UserRole, UserSex } from "@project/shared/shared-types";
import { MAX_LENGTH_DESCRIPTION, MIN_LENGTH_DESCRIPTION } from "./dto.constants";

export class CreateUserDto  {
  @ApiProperty({
    description: 'User name',
    example: 'Иван',
  })
  @IsString()
  public name!: string;


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: 'The email is not valid' })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password!: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  public sex!: UserSex;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  @IsISO8601({}, { message: 'The user date birth is not valid' })
  public dateBirth!: string;

  @ApiProperty({
    description: 'The role of the user in the system',
    enum: UserRole, enumName: 'UserRole'
  })
  public role!: UserRole;

  @ApiProperty({
    description: 'Text with general information'
  })
  @MinLength(MIN_LENGTH_DESCRIPTION)
  @MaxLength(MAX_LENGTH_DESCRIPTION)
  public description!: string;

  @ApiProperty({
    description: 'Metro station',
    enum: StationMetro, enumName: 'StationMetro'
  })
  public location!: StationMetro;
}
