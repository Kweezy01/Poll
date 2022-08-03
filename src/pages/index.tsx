import { trpc } from '@/utils/trpc';

const Home = () => {

    const {data, isLoading} = trpc.useQuery(["hello", {text: "Kweezy"}])

    if (isLoading) {
            return <div>loading, just chill...</div>
        }

    if (data) {
            return <div>{data.greeting}</div>
        }

    return (
        <div className="h-screen w-screen flex flex-col justify-center align items-center">
            <div className="text-2xl text-center">Which pokemon is rounder?</div>
            <div className="p-2"/>
            <div className="border rounder p-8 flex justify-between max-w-2xl items-center">
                <div className="w-16 h-16 bg-red-200"/>
                <div className="p-8">VS</div>
                <div className="w-16 h-16 bg-red-200"/>
            </div>
        </div>
    );
};

export default Home;
