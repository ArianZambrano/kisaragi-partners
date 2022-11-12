import React from "react";
import styled from "styled-components";

const GeneralContainer = styled.div`
    padding: 60px 0;
    margin: 0 auto;
`

export default function Container({children}) {
    return <GeneralContainer> 
        {children}
    </GeneralContainer>
}