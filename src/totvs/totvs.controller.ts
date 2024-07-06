import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TotvsService } from './totvs.service';

@Controller('totvs')
export class TotvsController {
  constructor(private readonly totvsService: TotvsService) {}

  @Get('read-record')
  async readRecord(
    @Query('dataServerName') dataServerName: string,
    @Query('primaryKey') primaryKey: string,
    @Query('contexto') contexto: string,
    @Query('username') username: string,
    @Query('password') password: string,
    @Query('tbc') tbc: string,
  ) {
    return await this.totvsService.readRecord(
      dataServerName,
      primaryKey,
      contexto,
      username,
      password,
      tbc,
    );
  }

  @Post('save-record')
  async saveRecord(
    @Body('dataServerName') dataServerName: string,
    @Body('xml') xml: string,
    @Body('contexto') contexto: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('tbc') tbc: string,
  ) {
    return await this.totvsService.saveRecord(
      dataServerName,
      xml,
      contexto,
      username,
      password,
      tbc,
    );
  }
}
