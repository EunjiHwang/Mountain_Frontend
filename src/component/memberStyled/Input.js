import React from 'react';
import styled from 'styled-components';

const LoginInput = styled.input`
    /* 공통 Input 스타일 */
    width: 250px;
    height: 30px;
    margin: 0;
    margin-bottom:15px;
    padding: 0;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    outline: 1px solid #707070;
    border: 1px;
    font-size: 10px;
`;

function Input(props) {
    return <LoginInput type={props.type} placeholder={props.placeholder}></LoginInput>;
}

export default Input;