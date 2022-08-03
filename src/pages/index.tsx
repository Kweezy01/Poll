import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useState, useEffect } from 'react';

export default function Home() {


    const [options, setOpts] = useState([1, 2]);

    useEffect(() => {
            setOpts(getOptionsForVote())
        },[])

    const [first, second] = options;

    



    return (
        <div className="h-screen w-screen flex flex-col justify-center align items-center">
            <div className="text-2xl text-center">Which pokemon is rounder?</div>
            <div className="p-2"/>
            <div className="border rounder p-8 flex justify-between max-w-2xl items-center">
                <div className="w-16 h-16 bg-red-800">{first}</div>
                <div className="p-8">VS</div>
                <div className="w-16 h-16 bg-red-800">{second}</div>
            </div>
        </div>
    );
};

