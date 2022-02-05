import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const fetchColors = (page) => {

    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};

const PaginatedQueriesPage = () => {

    const [page, setPage] = useState(1);

    const { isLoading, data, isPreviousData } = useQuery(
        ['colors', page],
        () => fetchColors(page),
        { keepPreviousData: true }
    );

    if (isLoading) return <h1>Colors are being fetched</h1>;
    if (!isLoading) console.log(data);

    return (
        <div>
            {data?.data.map(color => (
                <div key={color.id}>{color.id} - {color.label}</div>
            ))}
            <div>
                <button disabled={page <= 1} onClick={() => setPage(page => page - 1)}>
                    Previous
                </button>
                <button onClick={() => setPage(page => page + 1)} disabled={page >= 4}>
                    Next
                </button>
            </div>
        </div>
    );

};

export default PaginatedQueriesPage;
