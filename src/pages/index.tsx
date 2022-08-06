import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useState, useEffect } from 'react';

import { trpc } from '@/utils/trpc';

export default function Home() {
    
    const [options, setOpts] = useState([1, 2]);
    
    useEffect(() => {
        setOpts(getOptionsForVote())
        }, []);
    
    const [first, second] = options;
    
    const first_pokemon = trpc.useQuery(['get-pokemon', { id: first }]);
    const second_pokemon = trpc.useQuery(['get-pokemon', { id: second }]);
    
    if (first_pokemon.isLoading || second_pokemon.isLoading) return "Loading";

    const vote_for_roundest = (selected: number) => {

        setOpts(getOptionsForVote())
    }
        
    console.log(first, second)
    console.log(first_pokemon.data)

    const BTN = "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        
    return (
        <div className="h-screen w-screen flex flex-col justify-center align items-center">
            <div className="text-2xl text-center">Which pokemon is rounder?</div>
            <div className="p-2"/>
            <div className="border rounder p-8 flex justify-between max-w-2xl items-center">
                <div className="w-64 h-64 flex flex-col items-center">
                    <img className='w-full' src={first_pokemon.data?.sprites?.front_default!}/>
                    <div className='text-center capitalize mt-[-2rem]' >{first_pokemon.data?.name}</div> 
                    <button className={BTN} onClick={() => vote_for_roundest(first)} >Rounder</button>
                </div>
                <div className="p-8">VS</div>
                <div className="w-64 h-64 flex flex-col items-center">
                    <img className='w-full' src={second_pokemon.data?.sprites?.front_default!} />
                    <div className='text-center capitalize mt-[-2rem]' >{second_pokemon.data?.name}</div>
                    <button className={BTN} onClick={() => vote_for_roundest(second)} >Rounder</button>
                </div>
            </div>
        </div>
    );
};
        
        
