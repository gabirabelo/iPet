import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import signInBackground from "../../assets/logo.jpg";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Title = styled.h1`
    line-height: 1;
    font-size: 3rem;
    margin: 1rem 0;
    position: relative;
    z-index: 1;
    /* ::after {
        content: "";
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        background: #61b7d4;
        position: absolute;
        bottom: 5px;
        left: -5px;
        border-radius: 0.2rem;
        z-index: -1;
    } */
`;

export const SubTitle = styled.h2`
    line-height: 1;
    font-size: 1.5rem;
    margin: 1rem 0;
    position: relative;
    z-index: 1;
    /* ::after {
        content: "";
        display: block;
        background: #61b7d4;
        height: 0.4rem;
        width: 9rem;
        border-radius: 0.2rem;
    } */
`;

export const BoxInitial = styled.div`
    display: flex;

    img {
        width: 5%;
        margin-right: 5px;
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    animation: ${appearFromLeft} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-bottom: 24px;
        }

        a {
            color: #64606c;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, "#f4ede8")};
            }
        }
    }
    > a {
        color: #f5b630;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        svg {
            margin-right: 16px;
        }
        &:hover {
            color: ${shade(0.2, "#fff")};
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackground}) no-repeat center;
    background-size: cover;
    background-color: #f6ba55;
`;
