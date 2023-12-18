import styled from "styled-components";
import { useState } from "react";

export default function Seats(props) {

    const [selected, setSelected] = useState([]);
    const [selectedNames, setSelectedNames] = useState([]);
    const [seatChosen, setSeatChosen] = useState(false);

    props.updateSeatsFunction(selected);
    props.updateSeatsNames(selectedNames)

    function renderSeat(seat){
        let chosen = false;
        let arraySelected = selected;
        if (arraySelected.includes(seat.id)){
            chosen = seatChosen;
            setChosen(chosen);
        } 
        let styleSeat = getStyleSeat(seat, chosen);
        return (<SeatItem data-test="seat" key={seat.id} style={styleSeat} onClick={() => selectSeat(seat)} >{seat.name}</SeatItem>);
    }

    function setChosen(chosen){
        if (chosen === false){
            setSeatChosen(true);
        }        
    }

    function selectSeat(seat){
        const index = selected.indexOf(seat.id);
        const array = selected;
        let newSelected;
        let newSelectedName;
        if (selected.includes(seat.id)){
            array.splice(index, 1);
            setSelected(array); 
            setSeatChosen(false);
        }
        else if (seat.isAvailable){
            if (selected === [] && selectedNames === []){
                newSelected = [seat.id];
                newSelectedName = [seat.name];
            }
            else {
                newSelected = [...selected, seat.id];
                newSelectedName = [...selectedNames, seat.name];
            }     
            setSelected(newSelected);     
            setSelectedNames(newSelectedName);  
            setSeatChosen(true);     
        }
        else {
            alert("Esse assento não está disponível");
        }          
    }

    function getStyleSeat(seat, isSelected){
        let styleObj;
        if (isSelected){
            styleObj = {background: "#1AAE9E", border: "1px solid #0E7D71"};
        }
        else if (!seat.isAvailable){
            styleObj = {background: "#FBE192", border: "1px solid #F7C52B"};
        }
        else {
            styleObj = {background: "#C3CFD9", border: "1px solid #7B8B99"};
        }        
        return (styleObj);
    }

    return (
        <SeatsContainer>
            {props.list.map(seat => renderSeat(seat))}
        </SeatsContainer>
    )
}

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const SeatItem = styled.div`    
    color: "#000000";
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
`