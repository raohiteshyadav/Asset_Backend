import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Laptop } from './entities/laptop.entity';
import { Desktop } from './entities/desktop.entity'; // Add all other entities
import { Ap } from './entities/ap.entity';
import { Cctv } from './entities/cctv.entity';
import { HardDisk } from './entities/hardDisk.entity';
import { IpPhone } from './entities/ipPhone.entity';
import { NetworkDevice } from './entities/networkDevice.entity';
import { Nvr } from './entities/nvr.entity';
import { Other } from './entities/other.entity';
import { Printer } from './entities/printer.entity';
import { Projector } from './entities/projector.entity';
import { PunchMachine } from './entities/punchMachine.entity';
import { Switch } from './entities/switch.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Laptop,
      Desktop,
      Ap,
      Cctv,
      HardDisk,
      IpPhone,
      NetworkDevice,
      Nvr,
      Other,
      Printer,
      Projector,
      PunchMachine,
      Switch,
      Assignment,
    ]),
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
