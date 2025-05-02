import PlayersInterface from "@/models/Players";
import {trainingApiClient} from "@/api/axios";

export async function fetchPlayersOnline(): Promise<PlayersInterface> {
  const response = await trainingApiClient.get('/online');

  return response.data.data;
}

export async function fetchPlayersCounter(): Promise<number> {
  const response = await trainingApiClient.get('/online');

  return response.data.data.length;
}