export interface CopchaseLobbies {
  number: number;
  status: string;
  time: string;
  rating: string;
  players: number;
}

interface Copchase {
  type: string;
  lobbies: CopchaseLobbies[];
  timestamp: number;
}

export default Copchase;