import { ModerRole, VerifyRole } from "@/services/PlayerService";

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
    tooltip: {
      pageIsNotAvailable: string;
    }
  }
  common: {
    inputLabel: string;
    buttonLabel: string;
    no: string;
    yes: string;
    landing: {
      disclaimer_part1: string;
      disclaimer_part2: string;
      disclaimer_part3: string;
      disclaimer_part4: string;
      purpose: string;
      open_source_message: string;
      source_code_link: string;
      last_update_prefix: string;
      training_api_link: string;
    }
    loading: string;
  }
  playerinfo: {
    success: {
      dataUpdated: string;
    };
    title: string;
    info: {
      id: string;
      nickname: string;
      verify: string;
      status: string;
      verifyText: string;
      muteTime: string;
      registerDate: string;
      registerDateBefore2018: string;
      lastConnect: string;
      lastConnectNow: string;
      timeAgo: string;
    };
    button: {
      refresh: string;
      punishments: string;
      additional: string;
    };
    verify: Record<VerifyRole, string>;
    moderator: Record<ModerRole, string> & { admin: string };
  };
  errors: {
    error_dataUpdate: string;
    error_nickname: string;
    error_dataLoading: string;
    error_symbols: string;
    error_unexpected: string;
    error_playerHasNoPunishments: string;
    error_unexpectedCopyError: string;
  }
  additionalinfo: {
    title: string;
    achievement: string;
    bonus_points: string;
    copchase_rate: string;
    prefix: string;
    social_credits: string;
    signs: string;
    premium: string;
    premium_expires: string;
  }
  punishments: {
    title: string;
    list: {
      text: string;
      copied: string;
    };
    button: {
      copy: string;
      close: string;
    };
    content: {
      admin: string;
      reason: string;
      date: string;
    };
  }
  admins: {
    title: string;
    content: {
      id: string;
      nickname: string;
      lastConnect: string;
      warnsIssued: string;
    }
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
    content: {
      number: string;
      status: string;
      time: string;
      rating: string;
      players: string;
    };
    statuses: {
      waiting: string;
      inProgress: string;
      waitingForPlayers: string;
    };
  }
  players: {
    title: string;
    id: string;
    nickname: string;
    connected: string;
  }
  worlds: {
    title: string;
    status: {
      usingSSMP: string;
      static: string;
      sensitive_modeActive: string;
      sensitive_modeDisabled: string;
      totalWorlds: string;
    };
    formatted: {
      worldInfo: string;
      totalWorlds: string;
    };
    message: {
      successfully_copied: string;
    };
    button: {
      copy: string;
      enableSensitiveMode: string;
      disableSensitiveMode: string;
    };
    table: {
      name: string;
      online: string;
      tags: string;
    };
    other: {
      no_tags: string;
      ssmp: string;
    };
  }
  suffixes: {
    days: string;
    day: string;
    days1: string;
    minutes: string;
    minute: string;
    minute1: string;
    today: string;
    yesterday: string;
    now: string;
  }
  title: {
    admins: string;
    badges: string;
    copchase: string;
    players: string;
    worldlist: string;
  }
}