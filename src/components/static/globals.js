import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    --MainColor: ${({theme}) => theme.MainColor};
    --DecorateColor: ${({ theme }) => theme.DecorateColor};
    --SecondaryColor: ${({theme}) => theme.SecondaryColor};
    --SecondaryColorDecorate: ${({theme}) => theme.SecondaryColorDecorate};
}
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
    }
a.current-page{
    color: ${({ theme }) => theme.MainColor};
}

`;