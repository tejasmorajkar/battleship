import { Utilities } from './../utilities/utilties';
import { Injectable } from '@angular/core';
import { Ship } from '../models/ship';
import { Board } from '../models/board';
import { Coordinate } from '../models/coordinate';
import { Constants } from '../models/constants';

@Injectable()
export class ShipPlacementService {
  constructor() {}

  public placeShipsOnBoard(ships: Ship[], board: Board): void {
    ships.map((ship) => {
      this.placeShipRandomly(ship, board);
    });
  }

  private placeShipRandomly(aShip: Ship, board: Board): void {
    let coordinate: Coordinate;
    do {
      coordinate = new Coordinate(
        Utilities.generateRandomNumber(0, board.RowCount - 1),
        Utilities.generateRandomNumber(0, board.ColumnCount - 1)
      );
    } while (!this.PlaceShip(coordinate, aShip, board));
  }

  private PlaceShip(
    coordinate: Coordinate,
    aShip: Ship,
    board: Board
  ): boolean {
    let result = this.placeShipHorizontallyOnBoard(coordinate, aShip, board);
    if (!result) {
      result = this.placeShipVerticallyOnBoard(coordinate, aShip, board);
    }
    return result;
  }

  private placeShipVerticallyOnBoard(
    coordinate: Coordinate,
    aShip: Ship,
    board: Board
  ): boolean {
    const boardValues = board.Values;
    let result = false;
    if (
      coordinate.rowIndex + aShip.size - 1 <= board.ColumnCount &&
      coordinate.rowIndex + aShip.size - 1 < board.RowCount &&
      this.checkVerticalVacancy(
        coordinate,
        coordinate.rowIndex + aShip.size - 1,
        board
      )
    ) {
      result = true;
      for (
        let currentX = coordinate.rowIndex;
        currentX <= coordinate.rowIndex + aShip.size - 1;
        currentX++
      ) {
        boardValues[currentX][coordinate.columnIndex] = aShip.name;
      }
    }
    return result;
  }

  private placeShipHorizontallyOnBoard(
    coordinate: Coordinate,
    aShip: Ship,
    board: Board
  ): boolean {
    const boardValues = board.Values;
    let result = false;
    if (
      coordinate.columnIndex + aShip.size - 1 <= board.ColumnCount &&
      coordinate.columnIndex + aShip.size - 1 < board.ColumnCount &&
      this.checkHorizontalVacancy(
        coordinate,
        coordinate.columnIndex + aShip.size - 1,
        board
      )
    ) {
      result = true;
      for (
        let currentY = coordinate.columnIndex;
        currentY <= coordinate.columnIndex + aShip.size - 1;
        currentY++
      ) {
        boardValues[coordinate.rowIndex][currentY] = aShip.name;
      }
    }
    return result;
  }

  private checkVerticalVacancy(coordinate: Coordinate, xEnd: number, board: Board): boolean {
    let result = false;
    for (let xIndex = coordinate.rowIndex; xIndex < xEnd; xIndex++) {
        if (board.Values[xIndex][coordinate.columnIndex] === Constants.Empty) {
          result = true;
        } else {
          result = false;
          break;
        }
    }
    return result;
  }

  private checkHorizontalVacancy(coordinate: Coordinate, yEnd: number, board: Board): boolean {
    let result = false;
    for (let yIndex = coordinate.columnIndex; yIndex < yEnd; yIndex++) {
        if (board.Values[coordinate.rowIndex][yIndex] === Constants.Empty) {
          result = true;
        } else {
          result = false;
          break;
        }
    }
    return result;
  }
}
