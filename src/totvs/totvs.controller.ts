import { Controller, Get, Query } from '@nestjs/common';
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
    return this.totvsService.readRecord(
      dataServerName,
      primaryKey,
      contexto,
      username,
      password,
      tbc,
    );
  }

  // @Post()
  // create(@Body() createTotvDto: CreateTotvDto) {
  //   return this.totvsService.create(createTotvDto);
  // }

  // @Get()
  // findAll() {
  //   return this.totvsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.totvsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTotvDto: UpdateTotvDto) {
  //   return this.totvsService.update(+id, updateTotvDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.totvsService.remove(+id);
  // }
}
