import { ShipPlacementService } from './ship-placement.service';
import { Coordinate } from './../models/coordinate';
import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { Ship } from '../models/ship';

@Injectable()
export class GameEngineService {
  board: Board;
  boardHeight: number;
  boardWidth: number;

  constructor(private shipPlacementService: ShipPlacementService) {
    this.initialize();
  }

  public initialize(): void {
    this.board = this.createBoard();
    this.shipPlacementService.placeShipsOnBoard(this.board.Ships, this.board);
  }

  private createBoard(): Board {
    this.boardHeight = this.boardWidth = 10;
    return new Board(this.boardHeight, this.boardWidth);
  }
}
