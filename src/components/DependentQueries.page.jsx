import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesById = (userChannelId) => {
    return axios.get(`http://localhost:4000/channels/${userChannelId}`);
};

const DependentQueriesPage = ({ email }) => {

    const { data: user } = useQuery(
        ['user', email],
        () => fetchUserByEmail(email)
    );
    const userChannelId = user?.data.channelId;
    console.log(userChannelId);

    const { isLoading, data } = useQuery(
        ['courses', userChannelId],
        () => fetchCoursesById(userChannelId),
        {
            enabled: !!userChannelId // NOTE: we say that fetch the data only if the channel id is exists / have already fetched and got
        }
    );

    if (!isLoading) console.log(data);

    return <>
        <h1>DependentQueriesPage</h1>
        <div>{data?.data.courses.map(course => (
            <div key={course}>Name of course: <strong>{course.toUpperCase()}</strong></div>
        ))}</div>;
    </>;
};

export default DependentQueriesPage;
