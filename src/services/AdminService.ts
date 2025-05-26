"use server"
import Admin from "@/models/Admin";
import { trainingApiClient } from "@/api/axios";

export default async function AdminList(): Promise<Admin[]> {
  const response = await trainingApiClient.get("/admin");

  return response.data;
}