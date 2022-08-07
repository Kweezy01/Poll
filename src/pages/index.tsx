import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useState, useEffect } from 'react';

import { trpc } from '@/utils/trpc';
import { Mutation } from 'react-query';

export default function Home() {

    const [options, setOpts] = useState([1, 2]);

    useEffect(() => {
        setOpts(getOptionsForVote())
    }, []);

    const [first, second] = options;

    const first_pokemon = trpc.useQuery(['get-pokemon', { id: first }]);
    const second_pokemon = trpc.useQuery(['get-pokemon', { id: second }]);

    const vote_mutation = trpc.useMutation(["cast_vote"])

    if (first_pokemon.isLoading || second_pokemon.isLoading) return "Loading";

    const vote_for_roundest = (selected: number) => {

        if (selected === first) {
            console.log("Working")
            vote_mutation.mutate({ votedFor: first, votedAgainst: second })
        } else {
            console.log("Second")
            vote_mutation.mutate({ votedFor: second, votedAgainst: first })
        }

        setOpts(getOptionsForVote())
    }

    const BTN = "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

    return (
        <div className="h-screen w-screen flex flex-col justify-center align items-center">
            <div className="text-2xl text-center">Which pokemon is rounder?</div>
            <div className="p-2" />
            <div className="border rounder p-8 flex justify-between max-w-2xl items-center">
                <div className="w-64 h-64 flex flex-col items-center">
                    <img className='w-full' src={first_pokemon.data?.sprites?.front_default!} />
                    <div className='text-center capitalize mt-[-2rem]' >{first_pokemon.data?.name}</div>
                    <button className={BTN} onClick={() => vote_for_roundest(first)} >Rounder</button>
                </div>
                <div className="p-8">VS</div>
                <div className="w-64 h-64 flex flex-col items-center">
                    <img className='w-full' src={second_pokemon.data?.sprites?.front_default!} />
                    <div className='text-center capitalize mt-[-2rem]' >{second_pokemon.data?.name}</div>
                    <button className={BTN} onClick={() => vote_for_roundest(second)} >Rounder</button>
                    <p className='text-green-700' >Something else</p>
                </div>
            </div>
        </div>
    );
};


