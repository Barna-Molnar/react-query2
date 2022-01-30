import axios from "axios";
import { useQuery } from "react-query";


const RQSuperheroes = () => {

    const fetchDataWithAxios = async () => {
        const data = await axios.get('http://localhost:4000/superheroes');
        return data;
    };

    const { data, status } = useQuery(['superheros'], fetchDataWithAxios);

    console.log(data);

    if (status === 'loading') return <h1>Data is being fetched....</h1>;

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
