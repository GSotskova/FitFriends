import { Body, Controller, HttpCode, HttpStatus, Post, Req,  UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { fillObject } from '@project/util/util-core';
import { NewCoachRdo } from './rdo/new-coach.rdo';
import { NewUserRdo } from './rdo/new-user.rdo';
import { RequestWithTokenPayload, RequestWithUser, TokenLogin, UserRole } from '@project/shared/shared-types';
import { CreateUserDto } from'@project/shared/shared-dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CheckJwtAuthGuard } from './guards/check-jwt-auth.guard';


@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    if (newUser.role === UserRole.Coach) {
    return fillObject(NewCoachRdo, newUser);
    }
    return fillObject(NewUserRdo, newUser);

  }

  @UseGuards(CheckJwtAuthGuard, LocalAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: RequestWithUser & TokenLogin ,@Body() tokenInfo?: TokenLogin) {
    const tt ={userIdAuth: tokenInfo.userIdAuth, token: tokenInfo.token} as TokenLogin;
    return this.authService.createUserToken(req.user, tt);
  }

 @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh/delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete refresh token'
  })
  public async deleteRefreshToken(@Req() { user }: RequestWithUser) {
    return user;
  }


  @UseGuards(JwtAuthGuard)
  @Post('check')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check access token'
  })
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @UseGuards(CheckJwtAuthGuard)
  @Post('isauth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User is auth'
  })
  public async isAuth(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

}
