export const isChecked: any = () => {
	return async (value: boolean) => {
		return { valid: value, name: 'isChecked' };
	};
};
