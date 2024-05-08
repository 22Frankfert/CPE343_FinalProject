import styled from "styled-components";

export const ProcessContainer = styled.div`
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;

    @media screen and (max-width: 768px) {
        height: 1100px;
    }

    @media screen and (max-width: 480px) {
        height: 1300px;
    }
`

export const ProcessWrapper = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gab: 16px;
    padding: 0 50px;

    @media screen and (max-width:1000px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`

export const ProcessCard = styled.div`
    background: #F3C6C6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    margin: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        tranform: scale(1.02);
        transition: all 0.2 ease-in-out;
        cursor: pointer;
    }
`

export const ProcessH1 = styled.h1`
    font-size: 2.5rem;
    color: #CE3A50;
    margin-bottom: 64px;

    @media screen and (max-width: 480px) {
        font-size: 2rm
    }
`

export const ProcessH2 = styled.h2`
    font-size: 1rem;
    margin-bottom: 10px;
    
`

export const ProcessP = styled.p`
    font-size: 1rem;
    text-align: center;
    color: #5B2F21;
`