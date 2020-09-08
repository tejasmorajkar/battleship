import { Result, ShotResult, GameStatus } from './../../models/result';
import { ResultService } from './../../services/result.service';
import { GameEngineService } from './../../services/game-engine.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Board } from '../../models/board';
import { ShipPlacementService } from '../../services/ship-placement.service';
import { Coordinate } from '../../models/coordinate';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  board: Board;
  showBoard = false;
  shot = '';
  gameStatus = '';
  history = [];
  coordinate = '';
  @ViewChild('form') form: any;

  constructor(
    private gameEngine: GameEngineService,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.board = this.gameEngine.board;
  }

  getShot(result: Result): string {
    return Object.keys(ShotResult).find((k) => ShotResult[k] === result.Shot);
  }

  getGameStatus(result: Result): string {
    return Object.keys(GameStatus).find((k) => GameStatus[k] === result.Status);
  }

  onShootClick(): void {
    if (this.form && this.form.nativeElement.checkValidity()) {
      this.history.push(this.coordinate);
      const coordinate = this.convertToCoodinate(this.coordinate);
      const result = this.resultService.validateShot(coordinate, this.board);
      this.shot = this.getShot(result);
      this.gameStatus = this.getGameStatus(result);
    }
  }

  private clearCoordinate(): void {
    this.coordinate = '';
  }

  private convertToCoodinate(input: string): Coordinate {
    const x = input.charCodeAt(0) - 65;
    const y = input.charCodeAt(1) - 49;
    return new Coordinate(x, y);
  }

  onLoseClick(): void {
    this.showBoard = true;
    const result = new Result(ShotResult.miss, GameStatus.lose);
    this.shot = '';
    this.gameStatus = this.getGameStatus(result);
  }

  onResetClick(): void {
    this.showBoard = false;
    this.clearCoordinate();
    this.history = [];
    this.shot = '';
    this.gameStatus = '';
    this.gameEngine.initialize();
    this.board = this.gameEngine.board;
    this.resultService.initialize();
  }

  onHideBoardClick(): void {
    this.showBoard = false;
  }

  onShowBoardClick(): void {
    this.showBoard = true;
  }
}
