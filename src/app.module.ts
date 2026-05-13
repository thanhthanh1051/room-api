import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { RoomModule } from './modules/room/room.module';
import { MasterOptionModule } from './modules/master-option/master-option.module';
import { FacilityModule } from './modules/facility/facility.module';
import { InquiryModule } from './modules/inquiry/inquiry.module';
import { RoomViewModule } from './modules/room-view/room-view.module';

@Module({
  imports: [
    PrismaModule,
    RoomModule,
    MasterOptionModule,
    FacilityModule,
    InquiryModule,
    RoomViewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
