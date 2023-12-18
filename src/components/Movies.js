import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Movies() {

    const API_URL = process.env.REACT_APP_API_URL;

    let session = "/sessoes/:";
    const [moviesList, setMoviesList] = useState(null);  

    useEffect(() => {

        const requestMovies = axios.get(`${API_URL}/movies`);
    
        requestMovies.then(answer => {
            setMoviesList(answer.data);
        });

        requestMovies.catch(errorRequest => {
            console.log(errorRequest.response.data);
        });
        
    }, []); 
    
    if(moviesList === null) {
        return <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />;
    }
    
    return (

        <ListContainer>
            {moviesList.map(item => 
                <MovieContainer data-test="movie" key={item.id}> 
                    <Link to={session + item.id} ><img src={item.posterURL} alt="poster"/></Link>                    
                </MovieContainer>)} 
        </ListContainer>       
    );
}

const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`