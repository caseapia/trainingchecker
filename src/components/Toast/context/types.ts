import React, {MouseEvent} from "react";

interface Toast {
	id: string;
	content: string;
	className?: string;
	type?: 'success' | 'error' | 'default';
	onClose: () => void;
	lifeTime?: number;
	clickAction?: (e: MouseEvent<HTMLDivElement>) => void;
}

interface ToastContextType {
	toasts: Toast[];
	addToast: (
		type: 'success' | 'error' | 'default',
		content: string,
		options?: {
			className?: string,
			lifeTime?: number,
			clickAction?: (e: MouseEvent<HTMLDivElement>) => void,
		}
	) => void;
	removeToast: (id: string) => void;
}

export type {Toast, ToastContextType};