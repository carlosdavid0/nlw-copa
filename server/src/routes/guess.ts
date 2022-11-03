import { FastifyInstance } from 'fastify'
import { number, z } from 'zod'
import { prisma } from '../lib/prisma'
import { authtenticate } from '../plugins/authenticate'



export async function GuessRoutes(fastify: FastifyInstance) {

    fastify.get('/guesses/count', async () => {
        const guesses = await prisma.guess.count()
        return { count: guesses }
    })

    fastify.post('/pools/:poolId/game/:gameId/guesses', { onRequest: [authtenticate] }, async (request, replay) => {


        const createGuessesParams = z.object({
            poolId: z.string(),
            gameId: z.string()
        })

        const createGuessesBody = z.object({
            firstTeamPoint: z.number(),
            secondTeamPoint: z.number(),
        })





        const { gameId, poolId } = createGuessesParams.parse(request.params)
        const { firstTeamPoint, secondTeamPoint } = createGuessesBody.parse(request.body)



        const participant = await prisma.participant.findUnique({
            where: {
                userId_poolId: {
                    poolId,
                    userId: request.user.sub
                }
            }
        })

        if (!participant) {
            return replay.status(404).send({
                message: "You're not allower to create a guess insider this pool"
            })
        }

        const guess = await prisma.guess.findUnique({
            where: {
                participantId_gameId: {
                    gameId: gameId,
                    participantId: participant.id
                }
            }
        })

        if (guess) {
            return replay.status(404).send({
                message: "You already sent a guess to this game on this pool"
            })
        }

        const game = await prisma.game.findUnique({
            where: {
                id: gameId,

            }
        })

        if (!game) {
            return replay.status(404).send({
                message: "Game not found"
            })
        }

        if (game.date < new Date()) {
            return replay.status(403).send({
                message: "You cannot sent guesses after the game date"
            })
        }

        await prisma.guess.create({
            data: {
                gameId: gameId,
                participantId: participant.id,
                firstTeamPoint: firstTeamPoint,
                secondTeamPoint: secondTeamPoint
            }
        })

        return replay.status(201).send()




        // return {
        //     gameId,
        //     poolId,
        //     firstTeamPoint,
        //     secondTeamPoint
        // }


    })
}