import React from "react";

interface Props {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	colSpan?: number;
	className?: string;
}

interface TableProps {
	width?: number;
	className?: string;
	children?: React.ReactNode;
}

export type {TableProps, Props}