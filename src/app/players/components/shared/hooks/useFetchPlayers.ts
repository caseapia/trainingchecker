import { useEffect, useState } from "react";
import PlayersInterface from "@/shared/models/Players";
import { fetchPlayersOnline } from "@/services/PlayersService";

interface FetchPlayersState {
  data: PlayersInterface | null;
  isLoading: boolean;
}

export const useFetchPlayers = (): FetchPlayersState => {
  const [data, setData] = useState<FetchPlayersState>({
    data: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const result = await fetchPlayersOnline();
        setData({
          data: result,
          isLoading: false,
        });
      } catch (error: any) {
        console.error(error);
        setData({
          data: null,
          isLoading: false,
        });
      }
    };

    fetchPlayers();
  }, []);

  return data;
};