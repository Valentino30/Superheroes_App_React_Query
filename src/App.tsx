import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

import { Hero } from "./types/hero";

const getSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const App = () => {
  const { isLoading, isError, data, error } = useQuery(
    "super-heroes",
    getSuperHeroes
  );

  if (isLoading) return <h2>Loading ...</h2>;

  if (isError) {
    if (error instanceof AxiosError) {
      return <h2>{error.message}</h2>;
    } else {
      return <h2>Something went wrong</h2>;
    }
  }

  return (
    <div>
      <h2>My Superheroes</h2>
      <ul>
        {data?.data.map((hero: Hero) => (
          <li key={hero.id}>
            <strong>{hero.name}</strong>: {hero.alterEgo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
