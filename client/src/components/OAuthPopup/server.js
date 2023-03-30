import Fastify from 'fastify';
import fetch from 'node-fetch';

const fastify = Fastify({
	logger: true,
});

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const AUTHORIZATION_SERVER_TOKEN_URL = process.env.AUTHORIZATION_SERVER_TOKEN_URL; // e.g https://oauth2.googleapis.com/token

fastify.post('/token', async (request, reply) => {
	const { code, client_id, redirect_uri } = request.query;

	const data = await fetch(
		`${AUTHORIZATION_SERVER_TOKEN_URL}?grant_type=authorization_code&client_id=${client_id}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect_uri}&code=${code}`,
		{
			method: 'POST',
		}
	);

	reply.send(await data.json());
});

fastify.listen(3001, (error) => {
	if (error) throw error;
});