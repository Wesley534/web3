import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch =({keyword}) => {
    const [gifUrl, setGifUrl] = useState("")

    const fetchGifs = async (keyword) => {
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split("").join("")}&limit=1&offset=0&rating=g&lang=en`);
            const { data } = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium?.url);
        }catch (error) {
            console.log(error);
            setGifUrl("https://media.tenor.com/1qZg0g5v6aAAAAAC/loading.gif");
        }

    }
    useEffect(() => {
        if (keyword) fetchGifs(keyword);
    }, [keyword]);
    return gifUrl;
}
export default useFetch;