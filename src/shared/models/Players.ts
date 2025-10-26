export interface Player {
  id: number;
  login: string;
  playerid: number;
  lastlogin: string;
  moder: number;
}

type PlayersInterface = Player[];

export default PlayersInterface;