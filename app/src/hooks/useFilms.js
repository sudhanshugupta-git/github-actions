import { useEffect } from "react";
import { getFilms } from "../services/filmService";
import { useFilmContext } from "../context/filmContext";

const useFilms = () => {
  const { setFilms} = useFilmContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFilms();
    //   console.log(res);
      setFilms(res.data.data);
    };
    fetchData();
  }, []);

  return null;
};


export default useFilms;
