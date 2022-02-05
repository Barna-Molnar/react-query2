import { useState } from "react";
import { useSuperHeroesData } from "../customHooks/useSuperHeroesData";
import ListOfSuperHeroes from "./ListOfSuperHeroes";

const RQSuperheroes = () => {

    const [refetchInterval, setRefetchInterval] = useState(3000);

    const onSuccess = (data) => {
        if (data.data.length >= 3) {
            setRefetchInterval(false);
        };
    };
    const onError = (error) => {
        if (error) {
            console.log('Perform side effect after encountering error...');
            setRefetchInterval(false);
        };
    };

    const options = {
        options: { onError, onSuccess, refetchInterval },
        id: 'heroes'
    };

    const { data, isLoading, error, isError, refetch, isFetching } = useSuperHeroesData(options);


    if (isLoading || isFetching) return <h1>Data is being fetched....</h1>;
    if (isError) return <h1>{error.message}</h1>;

    return <div>
        <h1>Super Heroes</h1>
        <button onClick={refetch}>
            Fetch Heroes
        </button>
        {data?.data.map((hero) => (
            <div key={hero.id}>
                Name : {hero.name}
                <br />
                Alterego: {hero.alterEgo}
                <br />
                <br />
            </div>
        ))}
        <ListOfSuperHeroes />
    </div>;

};

export default RQSuperheroes;
