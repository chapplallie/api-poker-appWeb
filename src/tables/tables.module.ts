import { Module, forwardRef } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { GameLogicModule } from '../game-logic/games-logic.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TablesController],
  imports: [
    UsersModule,
    forwardRef(() => GameLogicModule)
  ],

  providers: [
    TablesService],
  exports: [TablesService]
})
export class TablesModule { }
