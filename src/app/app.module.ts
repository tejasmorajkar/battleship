import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BoardComponent } from './modules/board/board.component';
import { GameComponent } from './modules/game/game.component';
import { FormsModule } from '@angular/forms';
import { GameEngineService } from './services/game-engine.service';
import { ShipPlacementService } from './services/ship-placement.service';
import { ResultService } from './services/result.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [GameEngineService, ShipPlacementService, ResultService]
})
export class AppModule { }
