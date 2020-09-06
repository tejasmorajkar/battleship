import { Constants } from './constants';
import { Coordinate } from './coordinate';
import { Ship } from './ship';

export class Board {
  private columnCount: number;

  public get ColumnCount(): number {
    return this.columnCount;
  }

  private rowCount: number;

  public get RowCount(): number {
    return this.rowCount;
  }

  private values: any[];

  public get Values(): any[] {
    return this.values;
  }

  private ships: Ship[];

  public get Ships(): Ship[] {
    return this.ships;
  }

  constructor(colCount: number, rowCount: number) {
    this.columnCount = colCount;
    this.rowCount = rowCount;
    this.values = this.createBoardValues(this.rowCount, this.columnCount);
    this.ships = this.createShips();
  }

  private createBoardValues(rowCount: number, columnCount: number): any[]{
    const arr = [];
    for (let i = 0; i < rowCount; i++) {
      arr[i] = [];
      for (let j = 0; j < columnCount; j++) {
        arr[i][j] = Constants.Empty;
      }
    }
    return arr;
  }

  private createShips(): Ship[] {
    const shipsArr = new Array<Ship>();
    shipsArr.push(new Ship('Carrier', 5));
    shipsArr.push(new Ship('BattleShip', 4));
    shipsArr.push(new Ship('Submarine', 3));
    shipsArr.push(new Ship('Patrol', 2));
    return shipsArr;
  }

  public isCoordinateEmpty(str: string): boolean {
    let result = false;
    if (str === Constants.Empty) {
      result = true;
    }
    return result;
  }

  public reset(): void {
    this.values = this.createBoardValues(this.rowCount, this.columnCount);
  }
}
