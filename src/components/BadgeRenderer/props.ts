type BadgeRendererProps = {
	player?: {
		id?: number;
		login?: string;
		lastlogin?: string;
		moder?: number;
		access?: number;
		verify?: number;
		verifyText?: string;
		mute?: number;
		online?: number;
		regdate?: string;
	};
};

export default BadgeRendererProps;