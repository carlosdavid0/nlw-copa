import Fastify from 'fastify'
import cors from '@fastify/cors'

import JWT from '@fastify/jwt'

import { PoolRoutes } from './routes/pools'
import { GuessRoutes } from './routes/guess'
import { UserRoutes } from './routes/user'
import { GameRoutes } from './routes/game'
import { AuthRoutes } from './routes/auth'



async function bootstrap() {
  const fastify = Fastify({ logger: true })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(JWT, {
    secret: 'nlwCopa'
  })


  await fastify.register(PoolRoutes)
  await fastify.register(GuessRoutes)
  await fastify.register(UserRoutes)
  await fastify.register(GameRoutes)
  await fastify.register(AuthRoutes)

  await fastify.listen({ port: 3333, })



}

bootstrap()
