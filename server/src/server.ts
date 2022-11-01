import Fastify from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import ShortUniqueID from 'short-unique-id'


const prisma = new PrismaClient({
  log: ['query'],
})

const generate = new ShortUniqueID({ length: 6 })

async function bootstrap() {
  const fastify = Fastify({ logger: true })

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get('/pools/count', async () => {
    const pool = await prisma.pool.count()
    return { count: pool }
  })

  fastify.get('/users/count', async () => {
    const user = await prisma.user.count()
    return { count: user }
  })
  fastify.get('/guesses/count', async () => {
    const guesses = await prisma.guess.count()
    return { count: guesses }
  })


  fastify.post('/pools', async (request, replay) => {

    const createPoolBody = z.object({
      title: z.string()

    })

    const { title } = createPoolBody.parse(request.body)
    const code = String(generate()).toUpperCase()



    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return replay.status(201).send({ code })



  })




  await fastify.listen({ port: 3333 })



}

bootstrap()
