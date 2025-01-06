import { useEffect, useState } from "react";

export const useGenerateId = (length: number): string => {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const generateId = (length: number): string => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      let result = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }

      return result;
    };

    const newID = generateId(length);
    setId(newID);
  }, []);

  return id;
};