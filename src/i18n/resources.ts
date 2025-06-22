export type TranslationResources = {
  nav: {
    home: string;
    players: string;
    badges: string;
    worldlist: string;
    copchase: string;
    admins: string;
  }
  common: {
    inputLabel: string;
    buttonLabel: string;
    no: string;
    yes: string;
  }
  playerinfo: {
    success_dataUpdated: (params: { nickname: string }) => string;
    info_id: string;
    info_nickname: string;
    info_verify: string;
    info_status: string;
    info_verifyText: string;
    info_muteTime: string;
    info_registerDate: string;
    info_registerDateBefore2018: string;
    info_lastConnect: string;
    info_lastConnectNow: (params: { playerid: number | string }) => string;
    info_timeAgo: string;
    title: string;
    button_refresh: string;
    button_punishments: string;
    button_additional: string;
  }
  errors: {
    error_dataUpdate: string;
    error_nickname: (params: { nickname: string }) => string;
    error_dataLoading: string;
    error_symbols: string;
  }
}