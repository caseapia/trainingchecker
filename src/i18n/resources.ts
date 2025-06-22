type BadgeTranslationEntry = {
  title: string;
  description?: string;
};

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
    success_dataUpdated: string;
    info_id: string;
    info_nickname: string;
    info_verify: string;
    info_status: string;
    info_verifyText: string;
    info_muteTime: string;
    info_registerDate: string;
    info_registerDateBefore2018: string;
    info_lastConnect: string;
    info_lastConnectNow: string;
    info_timeAgo: string;
    title: string;
    button_refresh: string;
    button_punishments: string;
    button_additional: string;
  }
  errors: {
    error_dataUpdate: string;
    error_nickname: string;
    error_dataLoading: string;
    error_symbols: string;
    error_unexpected_console: string;
    error_playerHasNoPunishments: string;
    error_unexpectedCopyError: string;
  }
  additionalinfo: {
    title: string;
    achievement: string;
    bonus_points: number;
    copchase_rate: number;
    prefix: string;
    social_credits: number;
    signs: string;
  }
  punishment: {
    title: string;
    punishment_list: string;
    successfully_copied: string;
    button_contentCopy: string;
    button_contentClose: string;
    content_admin: string;
    content_reason: string;
    content_date: string;
  }
  admins: {
    title: string;
    content_id: number;
    content_nickname: string;
    content_lastConnect: string;
    content_warnsIssued: string;
  }
  badges: {
    title: string;
    icon: string;
    name: string;
    description: string;
    items: {
      creator: BadgeTranslationEntry;
      admin: BadgeTranslationEntry;
      team: BadgeTranslationEntry;
      site: BadgeTranslationEntry;
      veteran: BadgeTranslationEntry;
      youtuber: BadgeTranslationEntry;
      exteam: BadgeTranslationEntry;
      bot: BadgeTranslationEntry;
      chronos: BadgeTranslationEntry;
    };
  }
  copchase: {
    title: string;
  }
  players: {
    title: string;
    id: string;
    nickname: string;
    connected: string;
  }
  worlds: {
    usingSSMP: string;
    static: string;
    formatted_worldInfo: string;
    sensitive_modeActive: string;
    totalWorlds: string;
    successfully_copied: string;
    sensitive_modeDisabled: string;
    title: string;
    button_copy: string;
    button_enableSensitiveMode: string;
    button_disableSensitiveMode: string;
    table_name: string;
    table_online: string;
    table_tags: string;
    no_tags: string;
    ssmp: string;
  }
}