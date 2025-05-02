import axios from "axios";
import Commits from "@/models/Commits";

export async function getLastCommit(): Promise<Commits> {
  const response = await axios.get('https://api.github.com/repos/caseapia/trainingchecker/commits', {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })

  return response.data[0];
}