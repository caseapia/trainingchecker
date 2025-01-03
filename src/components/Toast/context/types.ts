interface Toast {
	id: string;
	content: string;
	className?: string;
	type?: 'success' | 'error' | 'default';
	onClose: () => void;
	lifeTime?: number;
}

interface ToastContextType {
	toasts: Toast[];
	addToast: (
		type: 'success' | 'error' | 'default',
		content: string,
		options?: { className?: string, lifeTime?: number, }
	) => void;
	removeToast: (id: string) => void;
}

export type {Toast, ToastContextType};