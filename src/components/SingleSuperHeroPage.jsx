import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleSuperHeroData } from '../customHooks/useSingleSuperHeroData';

const SingleSuperHeroPage = () => {

    const params = useParams();


    const options = {
        cache: "singleHero",
        id: params.heroId
    };

    const { isLoading, data } = useSingleSuperHeroData(options);

    if (isLoading) {
        return <h1>Data is being fetched</h1>;
    }
    if (!isLoading) {
        console.log(data.data);
    }

    return (
        <>
            <h1>
                Super hero details
            </h1>
            {!isLoading && (
                <>
                    <div>{data.data.name}</div>
                    <div>{data.data.alterEgo}</div>
                    <div>{data.data.id}</div>
                </>
            )}
        </>
    );

};

export default SingleSuperHeroPage;
