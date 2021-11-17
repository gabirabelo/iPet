import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
    > header {
        height: 144px;
        background: #000;
        display: flex;
        align-items: center;
        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
            svg {
                color: #fff;
                width: 24px;
                height: 24px;
            }
        }
    }
`;

export const BoxModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 300px;
    color: black;
    background-color:white;
    border: 2px solid #000;
    box-shadow: 24;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;

    p{
        text-align: center;
        font-size: 15px;
        margin-bottom: 40px;
    }

    div{
        display: flex;
    }

    
`;

export const BoxDay = styled.button`
    border: 1px solid #C4C4C4;
    padding: 20px;
    width: 53px;
    height: 68px;
    text-align: center;
    color: #221D25;
    background: #fff;
    margin: 0px 10px;
    font-weight: 300;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    justify-content: center;

    
    :hover{
        background: #f5b630;
        color: #000;
        border: 1px solid #000;

    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -176px auto 0;
    width: 100%;
    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;
        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }
    }
    a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        &:hover {
            color: ${shade(0.2, "#f4ede8")};
        }
    }
`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;
    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }
    label {
        position: absolute;
        width: 48px;
        height: 48px;
        color: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            display: none;
        }
        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }
        &:hover {
            background: ${shade(0.2, "#ff9000")};
        }
    }
`;
