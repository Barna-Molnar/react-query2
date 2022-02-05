import React from 'react';
import { useSuperHeroesData } from '../customHooks/useSuperHeroesData';

const ListOfSuperHeroes = () => {


    const options = {
        options: {

            select: (data) => {
                const list = data.data.map((h) => h.name);
                return list;
            },
            onSuccess: () => console.log('Data was being fetched...'),
            enabled: false,
            refetchOnMount: false
        },
        id: 'listOfHeroes'

    };

    const { isLoading, data, refetch } = useSuperHeroesData(options);


    return (
        <>
            <button onClick={refetch}>
                Click to see a list of heroes
            </button>
            {data?.map(name => (
                <li key={name}>Hero Name: {name}</li>
            ))}

        </>
    );
};

export default ListOfSuperHeroes;
