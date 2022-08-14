import React, { useContext, useEffect, useRef, useState } from 'react'
import {Form , Row , Col , Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AppContext } from '../Context/appContext'

import './MessageForm.css'

function MessageForm() {

    const [message, setMessage] = useState('')// this is state of this component pkease dont mix it with context API
    const user = useSelector( (state) => state.user )
    const messageEndRef = useRef(null)
    const { socket , currentRoom , setMessages , messages , privateMemberMsg } = useContext(AppContext)

    useEffect(()=>{
         scrollToBotton()
    },[messages])

    function getFormattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      let month = (1 + date.getMonth()).toString();

      month = month.length > 1 ? month : "0" + month;
      let day = date.getDate().toString();

      day = day.length > 1  ? day : "0" + day

      return month + "/" + day + "/" + year;
    }

    function scrollToBotton(){

      messageEndRef.current?.scrollIntoView({behaviour:"smooth"})
    }

    const todayDate = getFormattedDate()

    socket.off('room-messages').on('room-messages' , (roomMessages) => {
      console.log("socket was triggered") 
      console.log("room messages" , roomMessages)
        setMessages(roomMessages)

    })

    function handleSubmit(e){

      e.preventDefault()
      if(!message) return
      const today = new Date()
      const minutes = today.getMinutes() < 10 ?  "0" + today.getMinutes() : today.getMinutes()
      const time = today.getHours() + ":" + minutes
      const roomId = currentRoom

      socket.emit('message-room' , roomId , message , user , time , todayDate)
      setMessage("")
  }


  return (
   <div> 

    
    <div className="messages-output">{!user && <div className='alert alert-danger'>Please Login</div>}
    {user && !privateMemberMsg?._id && <div className='alert alert-info'> You are in the {currentRoom} room</div>}
     {user && privateMemberMsg?._id && (
        <>
          <div className='alert alert-info conversation-info'>
            <div>
             Your conversation with {privateMemberMsg.name} <image src={privateMemberMsg.pitcure} className='conversation-profile-picture'></image>
            </div>
          </div>
        </>
     )}
      {user && messages.map(({_id:date , messagesByDate } , idx )=> (
   
        <div key={idx}>
          <p className='alert alert-info text-center message-date-indicator'>{date}</p>
          {messagesByDate?.map(({ content , time , from: sender} , msgIdx )=>(

              <div className={sender?.email == user?.email? "message" : "incomming-message"} key={msgIdx}>
                <div className='message-inner'>
                  <div className='d-flex align-item-center mb-3'>
                    <img src={sender.pitcure} style={{width:35, height:35 , objectFit:'cover' , borderRadius:'50%', marginRight:10}}></img>
                    <p className='message-sender'>{sender._id == user?._id ? "You" : sender.name}</p>
                  </div>
                     <p className='message-content'>{content}</p>
                     <p className='message-timestamp-left'>{time}</p>
                </div>
              </div>
          ))}
        </div>

     ))}
     <div ref={messageEndRef}></div>
    </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>

          <Form.Group>
            <Form.Control type='text' placeholder='your message' disabled={!user} value={message} onChange={ e =>  setMessage(e.target.value)}></Form.Control>
          </Form.Group>

          </Col>

          <Col md={1}>
            
            <Button variant="primary"type="submit"style={{width:"100%",backgroundColor:"orange"}} disabled={!user} >

                <i className='fa fa-paper-plane'></i>
            </Button>
                                                             
          </Col>
                                                                                       

        </Row>
      </Form>
    </div>
  );
}

export default MessageForm