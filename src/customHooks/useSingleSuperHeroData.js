import axios from "axios";
import { useQuery } from "react-query";

const fetchDataWithAxios = async (id) => {
    const data = await axios.get(`http://localhost:4000/superheroes/${id}`);
    return data;
};

export const useSingleSuperHeroData = (props) => {



    return useQuery(
        [props.cache, props.id],

        () => fetchDataWithAxios(props.id),
        {
            ...props.options
        }

    );
};