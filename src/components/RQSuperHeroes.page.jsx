import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchDataWithAxios = async () => {
    const data = await axios.get('http://localhost:4000/superheroes');
    return data;
};

const RQSuperheroes = () => {

    const [refetchInterval, setRefetchInterval] = useState(3000);

    const onSuccess = (data) => {
        if (data.data.length === 4) {
            setRefetchInterval(false);
        }
    };
    const onError = (error) => {
        if (error) {
            console.log('Perform side effect after encountering error...');
            setRefetchInterval(false);

        }
    };

    const { data, isLoading, error, isError, refetch, isFetching } = useQuery(
        ['superheros'],

        fetchDataWithAxios,
        {
            // cacheTime: 50000, =>  this is the default value 
            // staleTime: 30000, => to reduce the request if you know that your data don't change often 
            // refetchOnMount: true // => default query will refetch the data 
            // refetchOnWindowFocus: true // anytime when window has the focus => refetch happans
            // refetchInterval: false // set in ms to fetch the data in a certain interval , it is stopped if the window looses focus 
            // refetchIntervalInBackground: false // will continue even wenn the browser is not in focus
            // enabled: false // to inform useQuery not to trigger the datafetching when the component mounts 
            // select: (data)=> { 
            //     const heroNames = data.data.map((hero)=> hero.name )   // any kind of data transformation => reflected on data immediately
            //     return heroNames
            // },
            onSuccess: onSuccess, //callback functon after succes
            onError: onError,  //callback functon after error
            refetchInterval: refetchInterval,
        }

    );


    if (isLoading || isFetching) return <h1>Data is being fetched....</h1>;
    if (isError) return <h1>{error.message}</h1>;

    return <div>
        <h1>Super Heroes</h1>
        <button
            onClick={refetch}
        >Fetch Heroes </button>
        {data?.data.map((hero) => (
            <div key={hero.id}>
                Name : {hero.name}
                <br />
                Alterego: {hero.alterEgo}
                <br />
                <br />
            </div>
        ))}
    </div>;
};

export default RQSuperheroes;
