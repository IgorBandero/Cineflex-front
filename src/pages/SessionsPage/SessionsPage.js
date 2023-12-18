import styled from "styled-components"
import Sessions from "../../components/Sessions.js"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function SessionsPage() {

    const API_URL = process.env.REACT_APP_API_URL;
    const [sessionsList, setSessionsList] = useState(null);
    const [movieSelected, setMovieSelected] = useState(null);

    const {idMovie} = useParams();
    let movie = idMovie;
    movie = movie.substring(1);

    useEffect(() => {
        const requestSessions = axios.get(`${API_URL}/movies/${movie}/showtimes`);
        
        requestSessions.then(answer => {
            setSessionsList(answer.data.days);
            let movieObj = {name: answer.data.title, image: answer.data.posterURL}
            setMovieSelected(movieObj);
        });
    
        requestSessions.catch(errorRequest => {
            console.log(errorRequest.response.data);
        });
            
    }, []); 

    if (sessionsList === null){
        return <> </>
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                <Sessions list={sessionsList} />                
            </div>
            <FooterContainer data-test="footer">
                <div>
                    <img src={movieSelected.image} alt="poster" />
                </div>
                <div>
                    <p>{movieSelected.name}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`