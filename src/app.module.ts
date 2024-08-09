import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExecuteSentenceModule } from './sentence/execute/execute-sentence.module';
import { TotvsModule } from './totvs/totvs.module';
import { ClientModule } from './api/client/client.module';

@Module({
  imports: [TotvsModule, ExecuteSentenceModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
