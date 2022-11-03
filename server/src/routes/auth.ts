import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authtenticate } from '../plugins/authenticate'



export async function AuthRoutes(fastify: FastifyInstance) {

    fastify.post('/users', async (request) => {
        const createUserBody = z.object({
            acessToken: z.string()
        })

        const { acessToken } = createUserBody.parse(request.body)

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${acessToken}`
            }
        })

        const userData = await userResponse.json()


        const UserInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url()
        })

        const userInfo = UserInfoSchema.parse(userData)


        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        })



        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    email: userInfo.email,
                    nome: userInfo.name,
                    avatarURL: userInfo.picture,

                }
            })
        }

        const token = fastify.jwt.sign({
            nome: user.nome,
            avatarURL: user.avatarURL
        }, {
            sub: user.id,
            expiresIn: '10 days'
        })
        return { token }



    })

    fastify.get('/me', { onRequest: [authtenticate] }, async (request) => {

        return { user: request.user }
    })
}