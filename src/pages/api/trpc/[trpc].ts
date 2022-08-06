import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { prisma } from '../../../utils/db';

import { PokemonClient } from 'pokenode-ts';

export const appRouter = trpc.router().query('get-pokemon', {
  input: z.object({ id: z.number() }),
  async resolve({ input }) {

    const api = new PokemonClient()

    const pokemon = await api.getPokemonById(input.id)

    return { name: pokemon.name, sprites: pokemon.sprites };
  },
}).mutation("cast_vote", {
  input: z.object({
    votedFor: z.number(),
    votedAgainst: z.number(),
  }),
  async resolve({ input }) {

    const write_vote_db = await prisma.vote.create({
      data:
        input
    });

    return { success: true, vote: write_vote_db };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
