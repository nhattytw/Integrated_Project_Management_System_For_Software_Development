import {Container,Row,Cols} from 'react-bootstrap'
import { Children, useState } from 'react'
import { Content } from 'rsuite'

const Schedule = ()=>{
    return(
        <h1>schedule</h1>
    )
}

const ContenetDisplay = ({content:Page},{children})=>{

    return(
    <Container>
            {children}
            <Page></Page>
    </Container>
    )
}

export default ContenetDisplay