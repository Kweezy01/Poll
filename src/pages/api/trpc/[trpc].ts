import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { number, z } from 'zod';

import { PokemonClient } from 'pokenode-ts';

import db from "../../../utils/init_firebase"

import { collection, addDoc } from "firebase/firestore"; 

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

    try {
      const docRef = await addDoc(collection(db, "Votes"), {
        vote_for: input.votedFor,
        vote_against: input.votedAgainst
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
