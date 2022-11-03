import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authtenticate } from '../plugins/authenticate'



export async function GameRoutes(fastify: FastifyInstance) {

    fastify.get('/pools/:id/games', { onRequest: [authtenticate] }, async (request, response) => {
        const getPoolParams = z.object({
            id: z.string()
        })

        const { id } = getPoolParams.parse(request.params)

        const games = await prisma.game.findMany({
            orderBy: {
                date: 'desc'
            },
            include: {
                guesses: {
                    where: {
                        participant: {
                            userId: request.user.sub,
                            poolId: id
                        }
                    }
                }
            }
        })


        return {
            game: games.map(game => {
                return {
                    ...game,
                    guess: game.guesses.length > 0 ? game.guesses[0] : null,
                    guesses: undefined
                }
            })

        }
    })

}