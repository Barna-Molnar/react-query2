import axios from "axios";
import { useQuery } from "react-query";

const fetchDataWithAxios = async () => {
    const data = await axios.get('http://localhost:4000/superheroes');
    return data;
};

const RQSuperheroes = () => {


    const { data, isLoading, error, isError } = useQuery(['superheros'], fetchDataWithAxios);


    if (isLoading) return <h1>Data is being fetched....</h1>;
    if (isError) return <h1>{error.message}</h1>;

    return <div>
        {data?.data.map((hero) => (
            <div key={hero.id}>
                Name : {hero.name}
                <br />
                <br />
                AlterEgo: {hero.alterEgo}
                <br />
                <br />
            </div>
        ))}
    </div>;
};

export default RQSuperheroes;
