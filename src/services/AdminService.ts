"use server"
import Admin from "@/shared/models/Admin";
import { trainingApiClient } from "@/shared/api/axios";

export default async function AdminList(): Promise<Admin[]> {
  const response = await trainingApiClient.get("/admin");

  return response.data;
}