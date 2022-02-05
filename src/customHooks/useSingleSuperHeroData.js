import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchDataWithAxios = async (id) => {
    const data = await axios.get(`http://localhost:4000/superheroes/${id}`);
    return data;
};

export const useSingleSuperHeroData = (heroId) => {

    const queryClient = useQueryClient();

    return useQuery(
        ['super-hero', heroId],

        () => fetchDataWithAxios(heroId),
        {
            initialData: () => {
                const hero = queryClient.getQueryData('super-heroes')?.data.find(hero => hero.id === Number(heroId));
                if (hero) {
                    return {
                        data: hero
                    };
                } else {
                    return undefined;
                }
            }
        }

    );
};