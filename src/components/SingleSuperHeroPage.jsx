import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleSuperHeroData } from '../customHooks/useSingleSuperHeroData';

const SingleSuperHeroPage = () => {

    const params = useParams();

    const { isLoading, data } = useSingleSuperHeroData(params.heroId);

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
