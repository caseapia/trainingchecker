import Cookies from "js-cookie";

const HASH_NAME = "__ha_sh";
const HASH_LENGTH = 16;
const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";

const createHash = (): string => {
  return Array.from({ length: HASH_LENGTH }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)].toUpperCase()
  ).join("");
};

export const setHash = (): void => {
  const storedHash = localStorage.getItem(HASH_NAME);
  const cookieHash = Cookies.get(HASH_NAME);

  if (!cookieHash) {
    const hashToSet = storedHash || createHash();
    Cookies.set(HASH_NAME, hashToSet, {
      secure: true,
      sameSite: "strict",
    });

    if (!storedHash) {
      localStorage.setItem(HASH_NAME, hashToSet);
    }
  }
};