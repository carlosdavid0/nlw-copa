import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            nome: 'John Doe',
            email: "johndoe@gmail.com",
            avatarURL: "https://github.com/carlosdavid0.png",
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "Exemple Pool",
            code: "pool123",
            ownerId: user.id,
            Participant: {
                create: {
                    userId: user.id
                }
            }

        }
    })


    await prisma.game.create({
        data: {
            date: '2022-11-01T16:39:20.299Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: "BR"

        }
    })


    await prisma.game.create({
        data: {
            date: '2022-11-03T16:39:20.299Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: "AR",
            guesses: {
                create: {
                    firstTeamPoint: 2,
                    secondTeamPoint: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })




}


main()