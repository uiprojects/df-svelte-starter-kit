import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { client } from '$lib/server/DF/sdk';
// import { env } from '$env/dynamic/private'
// import * as Sentry from "@sentry/sveltekit";
// import crypto from 'crypto';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const unProtectedRoutes = ['/forgot-password', '/login'];
	if (!event.cookies.get('token') && !unProtectedRoutes.includes(event.url.pathname)) {
		return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
	}
	if (event.cookies.get('token') && event.url.pathname.startsWith('/login')) {
		return new Response('Redirect', { status: 303, headers: { Location: '/' } });
	}
	event.locals.client = client;

	if (event.cookies.get('df_user')) {
		event.locals.token = event.cookies.get('token');
		event.locals.user = JSON.parse(event.cookies.get('df_user'));
	}
	return resolve(event);
}

// const ii8: Handle = async ({ event, resolve }) => {
//     return resolve(event)
// }

// export const handle = sequence(auth)

// Sentry.init({
//     dsn: env.SENTRY_URL,

//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0,

//     // Optional: Initialize Session Replay:
//     // integrations: [new Sentry.Replay()],
//     // replaysSessionSampleRate: 0.1,
//     // replaysOnErrorSampleRate: 1.0,
// });

// /** @type {import('@sveltejs/kit').HandleServerError} */
// export async function handleError({ error, event }) {
//     const errorId = crypto.randomUUID();
//     // example integration with https://sentry.io/
//     Sentry.captureException(error, { extra: { event, errorId } });

//     return {
//         message: 'Whoops!',
//         errorId
//     };
// }
