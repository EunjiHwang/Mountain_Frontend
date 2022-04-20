import React from 'react';
import styled from 'styled-components';

const LoginButton = styled.button`
    /* LoginButton 스타일 */
    height: 35px;
    background-color: #4c8969;
    color: white;
    border-radius: 10px;
    padding: 5px;
    opacity: 1;
    border: 0;
    outline: 0;
    margin: 5px 0 5px 0;
`;

function Button(props) {
    return <LoginButton type={props.type}>{props.children}</LoginButton>;
}

export default Button;