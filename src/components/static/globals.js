import { createGlobalStyle } from "styled-components";

export default createGlobalStyle `
    body{
    background: ${({theme}) => theme.body}
    color: ${({ theme}) => theme.text}
    }
`