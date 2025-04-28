import {chronoApiClient} from "@/api/axios";
import {WorldsResponse} from "@/models/Worlds";

export async function getWorlds(): Promise<WorldsResponse> {
  const {data} = await chronoApiClient.get<WorldsResponse>('/worlds');
  
  return data;
}
