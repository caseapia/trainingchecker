export interface World {
  name: string;
  players: number;
  static: boolean;
  ssmp: boolean;
  timestamp: number;
}

export interface WorldsResponse {
  type: string;
  worlds: World[];
  timestamp: number;
}