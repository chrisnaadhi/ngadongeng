import { writable } from 'svelte/store';

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
	duration?: number; // ms, default 4000
}

export const toasts = writable<Toast[]>([]);

export function addToast(toast: Omit<Toast, 'id'>) {
	const id = crypto.randomUUID();
	const duration = toast.duration ?? 4000;
	toasts.update((all) => [...all, { ...toast, id, duration }]);
	if (duration > 0) {
		setTimeout(() => removeToast(id), duration);
	}
}

export function removeToast(id: string) {
	toasts.update((all) => all.filter((t) => t.id !== id));
}
