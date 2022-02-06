import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchDataWithAxios = async () => {
    const data = await axios.get(`http://localhost:4000/superheroes`);
    return data;
};

export const useSuperHeroesData = ({ onSucces, onError }) => {
    return useQuery(
        ['super-heroes'],

        fetchDataWithAxios,
        {
            onSucces,
            onError
            // cacheTime: 50000, =>  this is the default value 
            // staleTime: 30000, => to reduce the request if you know that your data don't change often 
            // refetchOnMount: true // => default query will refetch the data 
            // refetchOnWindowFocus: true // anytime when window has the focus => refetch happens
            // refetchInterval: false // set in ms to fetch the data in a certain interval , it is stopped if the window looses focus 
            // refetchIntervalInBackground: false // will continue even wenn the browser is not in focus
            // enabled: false // to inform useQuery not to trigger the datafetching when the component mounts 
            // select: (data)=> { 
            //     const heroNames = data.data.map((hero)=> hero.name )   // any kind of data transformation => reflected on data immediately
            //     return herofNames
            // },
            // onSuccess: props.onSuccess, //callback functon after succes
            // onError: props.onError,  //callback functon after error
            // refetchInterval: props.refetchInterval,
        }

    );
};

const addSuperHero = (hero) => {
    return axios.post(`http://localhost:4000/superheroes`, hero);
};

export const useAddSuperHeroData = () => {

    const queryClient = useQueryClient();

    return useMutation(
        addSuperHero,
        {
            onSuccess: (data) => {

                // queryClient.invalidateQueries('super-heroes'); // NOTE: this couses an additional network call 
                queryClient.setQueryData('super-heroes', (oldQueryDataInCache) => {
                    return {
                        ...oldQueryDataInCache,
                        data: [...oldQueryDataInCache.data, data.data]
                    };
                });
            },
        },
    );


};