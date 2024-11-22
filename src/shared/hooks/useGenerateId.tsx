import { useEffect, useState } from "react";

export const useGenerateId = (): string => {
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

    const newID = generateId(6);
    setId(newID);
  }, []);

  return id;
};