import { Module } from '@nestjs/common';
import { TotvsController } from './totvs.controller';
import { TotvsService } from './totvs.service';

@Module({
  controllers: [TotvsController],
  providers: [TotvsService],
})
export class TotvsModule {}
