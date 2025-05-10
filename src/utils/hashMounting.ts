import Cookies from "js-cookie";

const HASH_COOKIE_NAME = "__ha_sh";
const HASH_LENGTH = 16;
const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";

const createHash = (): string => {
  return Array.from({ length: HASH_LENGTH }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)].toUpperCase()
  ).join("");
};

export const setHash = (): void => {
  if (!Cookies.get(HASH_COOKIE_NAME)) {
    Cookies.set(HASH_COOKIE_NAME, createHash(), {
      secure: true,
    });
  }
};