interface WarnEntry {
  admin: string;
  reason: string;
  bantime: string;
}

interface Types {
  id: number;
  login: string;
  warns: WarnEntry[];
  status: boolean;
  statusAction: (value: boolean) => void;
}

export default Types;