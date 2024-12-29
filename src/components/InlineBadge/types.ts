interface Props {
	handler?: string | number;
	content?: string;
	additionalClass?: string;
	badgeType: "danger" | "default" | "warning" | "success" | "blue";
	isLoading?: boolean;
}

export default Props;