import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Assignment } from './entities/assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { Cctv } from 'src/assets/entities/cctv.entity';
import { Ap } from 'src/assets/entities/ap.entity';
import { Desktop } from 'src/assets/entities/desktop.entity';
import { HardDisk } from 'src/assets/entities/hardDisk.entity';
import { IpPhone } from 'src/assets/entities/ipPhone.entity';
import { Laptop } from 'src/assets/entities/laptop.entity';
import { NetworkDevice } from 'src/assets/entities/networkDevice.entity';
import { Nvr } from 'src/assets/entities/nvr.entity';
import { Other } from 'src/assets/entities/other.entity';
import { Printer } from 'src/assets/entities/printer.entity';
import { Projector } from 'src/assets/entities/projector.entity';
import { PunchMachine } from 'src/assets/entities/punchMachine.entity';
import { Switch } from 'src/assets/entities/switch.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Assignment,
      Ap,
      Cctv,
      Desktop,
      HardDisk,
      IpPhone,
      Laptop,
      NetworkDevice,
      Nvr,
      Other,
      Printer,
      Projector,
      PunchMachine,
      Switch,
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
