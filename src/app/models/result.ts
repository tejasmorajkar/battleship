export enum ShotResult {
  hit,
  miss,
  sink
}

export enum GameStatus {
  win,
  lose,
  inProgress
}

export class Result {
  private shot: ShotResult;
  public get Shot(): ShotResult {
    return this.shot;
  }
  public set Shot(value: ShotResult) {
    this.shot = value;
  }

  private status: GameStatus;
  public get Status(): GameStatus {
    return this.status;
  }
  public set Status(value: GameStatus) {
    this.status = value;
  }

  constructor(shot: ShotResult, status: GameStatus) {
    this.shot = shot;
    this.status = status;
  }
}
