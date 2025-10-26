export type Lobbies = {
  number: number;
  status: string;
  time: string;
  rating: string;
  players: number;
}

interface Copchase {
  type: string;
  lobbies: Lobbies[];
  timestamp: number;
}

export default Copchase;