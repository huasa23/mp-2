import { NarutoType } from "./interfaces/Naruto";
import Naruto from "./components/Naruto";
import styled from "styled-components";
import {useEffect, useState} from "react";

const WrapperDiv=styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: auto;
`;

const NarutoHeaderDiv=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1vh 1vw;
`;

const NarutoMovieH1=styled.h1`
    margin: auto;
    font-family: "Sixtyfour Convergence", serif;
    font-optical-sizing: auto;
    font-size: calc(10px + 5vw);
    font-weight: 600;
    font-style: normal;
`;

export default function App(){

    const [narutoData, setNarutoData] = useState<NarutoType[]>([]);

    useEffect(() => {
        
        async function fetchData(): Promise<void> {
            const url = "https://api.jikan.moe/v4/anime?q=naruto";
            let rawData = await fetch(url);
            const {data} : {data: NarutoType[]} = await rawData.json();
            setNarutoData(data);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was the error: " + e));
    }, [narutoData.length]);

    return (
        <WrapperDiv>
            <NarutoHeaderDiv>
                <NarutoMovieH1>Naruto Movies</NarutoMovieH1>
            </NarutoHeaderDiv>
            <Naruto narutoData={narutoData}/>
        </WrapperDiv>
    )
}

