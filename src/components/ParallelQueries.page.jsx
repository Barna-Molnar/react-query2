import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchHeroesWithAxios = async () => {
    const data = await axios.get(`http://localhost:4000/superheroes`);
    return data;
};

const fetchFriendsWithAxios = async () => {
    const data = await axios.get(`http://localhost:4000/friends`);
    return data;
};

const ParalellQueriesPage = () => {

    const { data: superHeroes } = useQuery('super-heroes', fetchHeroesWithAxios);
    const { data: friends } = useQuery('friends', fetchFriendsWithAxios);

    return <div>
        <h1>ParalellQueries Page</h1>
        <h3>Heros: </h3>
        {superHeroes?.data.map((hero) => (
            <div key={hero.id}>{hero.name}</div>
        ))}
        <h3>Friends: </h3>
        {friends?.data.map((character) => (
            <div key={character.id}>{character.name}</div>
        ))}
    </div>;
};

export default ParalellQueriesPage;
