import styled, { css } from "styled-components";
import Tooltip from "../Tooltip";

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
    background: #eee;
    border-radius: 10px;
    border: 2px solid #eee;
    padding: 16px;
    color: #666360;
    width: 100%;
    display: flex;
    align-items: center;
    & + div {
        margin-top: 8px;
    }

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${(props) =>
        props.isFocused &&
        css`
            color: #f5b630;
            border-color: #f5b630;
        `}

    ${(props) =>
        props.isFilled &&
        css`
            color: #f5b630;
        `}

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #000;
        &::placeholder {
            color: #666360;
        }
    }
    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff;
        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
