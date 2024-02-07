<script lang="ts">
	import Login from '$lib/components/login/Login.svelte';
	import { MessageManager } from '$lib/common/MessageManager';
	

	export let data;

	let loading = false;
	let messages = new MessageManager();
	let userCookie: string;

	if (data.userNameCookie != null) {
		username.set(data.userNameCookie);
		userCookie = data.userNameCookie;
	}

	let authenticationTypeList = data.authenticationTypeResult

</script>

	<Login  {userCookie} {loading} {messages} {authenticationTypeList} />
	

