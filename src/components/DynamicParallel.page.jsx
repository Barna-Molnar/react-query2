import React from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallelPage = ({ heroIds }) => {

    const queryResults = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id)
            };
        })
    );

    console.log(queryResults[0].data);


    return <div>
        {queryResults.map(result => (
            <div key={result.data.data.id}>{result.data.data.name}</div>
        ))}
    </div>;
};

export default DynamicParallelPage;
