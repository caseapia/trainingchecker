interface Props {
	handler?: string | number;
	content?: string;
	additionalClass?: string;
	size?: "small" | "medium" | "large";
	type: "danger" | "default" | "warning" | "success" | "blue";
	isLoading?: boolean;
}

export default Props;