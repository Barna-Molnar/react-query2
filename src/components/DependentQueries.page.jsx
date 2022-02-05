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

    const { isLoading, data } = useQuery(
        ['courses', userChannelId],
        () => fetchCoursesById(userChannelId)
    );

    if (!isLoading) console.log(data);

    return <div>{data.data.courses.map(course => (
        <div key={course}>Name of course: <strong>{course.toUpperCase()}</strong></div>
    ))}</div>;
};

export default DependentQueriesPage;
