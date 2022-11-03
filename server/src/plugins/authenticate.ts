import { FastifyRequest } from 'fastify'



export async function authtenticate(request: FastifyRequest) {
    await request.jwtVerify()
}