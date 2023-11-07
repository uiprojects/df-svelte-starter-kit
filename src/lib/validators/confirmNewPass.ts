import { get } from 'svelte/store';

export const isPasswordMatched: any = (confirmPassword) => {
	return async (value: string) => {
		return { valid: get(confirmPassword).value === value, name: 'isPasswordMatched' };
	};
};
