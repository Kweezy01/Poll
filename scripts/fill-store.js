import { PokemonClient } from "pokenode-ts";

import db from "../../../utils/init_firebase"

import { collection, addDoc } from "firebase/firestore";


const doBackFill = async () => {
   const poke_api = new PokemonClient();

   const all_pokemon = poke_api.listPokemons(0, 493);

   console.log("pokemon?", all_pokemon);

   try {
      const docRef = await addDoc(collection(db, "Votes"), {
         vote_for: input.votedFor,
         vote_against: input.votedAgainst
      });
      console.log("Document written with ID: ", docRef.id);
   } catch (e) {
      console.error("Error adding document: ", e);
   }
};

doBackFill();