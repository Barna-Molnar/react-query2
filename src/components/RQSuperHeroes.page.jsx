import { useState } from "react";
import { useSuperHeroesData, useAddSuperHeroData } from "../customHooks/useSuperHeroesData";
import { Link } from 'react-router-dom';

const RQSuperheroes = () => {

    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');

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
        cache: 'super-heroes'
    };
    const { data, isLoading, error, isError, refetch, isFetching } = useSuperHeroesData(options);

    const { mutate: addHero } = useAddSuperHeroData();
    const handleAddHeroClick = () => {
        console.log({ name, alterEgo });
        const hero = { name, alterEgo };
        addHero(hero);
        setAlterEgo('');
        setName('');
    };


    if (isLoading || isFetching) return <h1>Data is being fetched....</h1>;
    if (isError) return <h1>{error.message}</h1>;

    return <div>
        <h1>Add superHero</h1>
        <input type="text" placeholder="Hero" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="alterEgo" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button
            onClick={handleAddHeroClick}
        >
            Add superHero</button>
        <h2>Super Heroes</h2>
        <button onClick={refetch}>
            Fetch Heroes
        </button>
        {data?.data.map((hero) => (
            <div key={hero.id}>
                <Link to={`${hero.id}`}>
                    Name : {hero.name}
                </Link>
            </div>
        ))}
        {/* <ListOfSuperHeroes /> */}
    </div>;

};

export default RQSuperheroes;
