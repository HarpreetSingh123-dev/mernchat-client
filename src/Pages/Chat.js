import React from 'react'
import {Container , Row , Col} from 'react-bootstrap'
import MessageForm from '../Components/MessageForm'
import SideBar from '../Components/SideBar'

function Chat() {
  return (
    <Container>
           
           <Row>               
               <Col md={4}>
                   <SideBar></SideBar>
               </Col>

               <Col md={8}>
                   <MessageForm></MessageForm>
               </Col>
           
           </Row>

    </Container>
  )
}

export default Chat