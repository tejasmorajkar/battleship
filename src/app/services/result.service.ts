import { Ship } from './../models/ship';
import { Result, GameStatus } from './../models/result';
import { Board } from './../models/board';
import { Injectable } from '@angular/core';
import { Coordinate } from '../models/coordinate';
import { ShotResult } from '../models/result';

@Injectable()
export class ResultService {
  hitShipsData = new Map<string, number>();
  sankShips = [];
  constructor() {}

  public initialize(): void {
    this.hitShipsData.clear();
  }

  public validateShot(coordinate: Coordinate, board: Board): Result {
    if (this.hitShipsData.size === 0) {
      board.Ships.map((ship) => this.hitShipsData.set(ship.name, 0));
    }
    let result = new Result(ShotResult.miss, GameStatus.inProgress);
    if (
      !board.isCoordinateEmpty(
        board.Values[coordinate.rowIndex][coordinate.columnIndex]
      )
    ) {
      const shipName =
        board.Values[coordinate.rowIndex][coordinate.columnIndex];
      result = this.checkIfShipSinkOrHit(shipName, board);
    }
    board.Values[coordinate.rowIndex][coordinate.columnIndex] += ' ' + Object.keys(
      ShotResult
    ).find((k) => ShotResult[k] === result.Shot);
    return result;
  }

  private checkIfShipSinkOrHit(shipName: string, board: Board): Result {
    const result = new Result(ShotResult.miss, GameStatus.inProgress);
    for (let i = 0; i < board.RowCount; i++) {
      for (let j = 0; j < board.ColumnCount; j++) {
        if (board.Values[i][j] === shipName) {
          result.Shot = ShotResult.hit;
          this.hitShipsData.set(shipName, this.hitShipsData.get(shipName) + 1);
          break;
        }
      }
      if (result.Shot === ShotResult.hit) {
        break;
      }
    }
    if (
      this.hitShipsData.get(shipName) ===
      board.Ships.find((s) => s.name === shipName).size
    ) {
      result.Shot = ShotResult.sink;
      this.sankShips.push(shipName);
    }
    if (this.sankShips.length === board.Ships.length) {
      result.Status = GameStatus.win;
    }
    return result;
  }
}
