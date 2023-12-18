import styled from "styled-components"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function SuccessPage(props) {

    const location = useLocation();
    const informations = location.state.data;
    const seatsList = informations[4].filter((value, index) => {
        return informations[4].indexOf(value) === index;
    });

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>
            
            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{informations[0].name}</p>
                <p>{informations[0].day} - {informations[0].hour}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {seatsList.map((seat, index) => <p key={index}> Assento {seat} </p>)}
                
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {informations[2]}</p>
                <p>CPF: {informations[3]}</p>
            </TextContainer>
            <Link data-test="go-home-btn" to="/" > 
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`