export type FlagResponse = {
  img: string;
  emoji: string;
  emoji_unicode: string;
}

export type ConnectionResponse = {
  asn: number;
  org: string;
  isp: string;
  domain: string;
}

export type TimezoneResponse = {
  id: string;
  abbr: string;
  is_dst: boolean;
  offset: number;
  utc: string;
  current_time: string;
}

export interface GeoResponse {
  ip: string;
  success: boolean;
  type: "IPv4" | "IPv6";
  continent: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  flag: FlagResponse;
  connection: ConnectionResponse;
  timezone: TimezoneResponse;
}

export default GeoResponse;