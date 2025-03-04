type PlayerData = {
	id: number;
	login: string;
	access: number;
	moder: number;
	verify: number;
	verifyText: string;
	mute: number;
	online: number;
	regdate: string;
	lastlogin: string;
	playerid: number;
	warn: Array<{ reason: string; bantime: string; admin: string; }>;
}

export default PlayerData;