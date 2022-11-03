import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

import ShortUniqueID from 'short-unique-id'

import { z } from 'zod'
import { authtenticate } from '../plugins/authenticate'




export async function PoolRoutes(fastify: FastifyInstance) {

    const generate = new ShortUniqueID({ length: 6 })


    fastify.get('/pools/count', async () => {
        const pool = await prisma.pool.count()
        return { count: pool }
    })

    fastify.get('/pools', { onRequest: [authtenticate] }, async (request, replay) => {
        const pools = await prisma.pool.findMany({
            where: {
                Participant: {
                    some: {
                        userId: request.user.sub
                    }
                }
            },
            include: {
                Participant: {
                    select: {
                        id: true,
                        User: {
                            select: {
                                avatarURL: true
                            }
                        }
                    },
                    take: 4
                },
                _count: {
                    select: {
                        Participant: true
                    }
                },
                owner: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        })


        return { pools }
    })


    fastify.get('/pool/:id', { onRequest: [authtenticate] }, async (request, replay) => {
        const getPoolParams = z.object({
            id: z.string()
        })

        const { id } = getPoolParams.parse(request.params)

        const pool = await prisma.pool.findUnique({
            where: {
                id
            },
            include: {
                Participant: {
                    select: {
                        id: true,
                        User: {
                            select: {
                                avatarURL: true
                            }
                        }
                    },
                    take: 4
                },
                _count: {
                    select: {
                        Participant: true
                    }
                },
                owner: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        })

        return { pool }
    })



    fastify.post('/pools', async (request, replay) => {

        const createPoolBody = z.object({
            title: z.string()

        })

        const { title } = createPoolBody.parse(request.body)
        const code = String(generate()).toUpperCase()


        try {
            await request.jwtVerify()

            await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: request.user.sub,
                    Participant: {
                        create: {
                            userId: request.user.sub
                        }
                    }
                }
            })

        } catch {
            await prisma.pool.create({
                data: {
                    title,
                    code
                }
            })

        }


        return replay.status(201).send({ code })



    })

    fastify.post('/pools/join', { onRequest: [authtenticate] }, async (request, replay) => {
        const joinPoolBody = z.object({
            code: z.string()
        })

        const { code } = joinPoolBody.parse(request.body)


        const pool = await prisma.pool.findUnique({
            where: {
                code
            }, include: {
                Participant: {
                    where: {
                        userId: request.user.sub
                    }
                }
            }
        })

        if (!pool) {
            return replay.status(400).send({
                message: "pool not found"
            })
        }

        if (pool.Participant.length > 0) {
            return replay.status(400).send({
                message: "User already participant"
            })
        }

        if (!pool.ownerId) {
            await prisma.pool.update({
                data: {
                    ownerId: request.user.sub
                },
                where: {
                    id: pool.id
                }
            })
        }


        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: request.user.sub
            }
        })


        return replay.status(201).send()

    })

}