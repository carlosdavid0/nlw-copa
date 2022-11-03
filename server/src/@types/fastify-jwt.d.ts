import '@fastify/jwt'


declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            nome: string
            avatarURL: string
            sub: string

        }

    }
}