// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
export const isValidGuid = (guid: string) => {
	const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return regex.test(guid);
};

export function getAuthHeader(accessToken: string) {
	// Function to append Bearer against the Access Token
	return 'Bearer '.concat(accessToken);
}
