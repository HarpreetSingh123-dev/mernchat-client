import React, { useState } from 'react'
import {useSignUpUserMutation} from '../Sevices/appApi'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Container , Row , Col } from 'react-bootstrap'
import BotImage from '../Assets/Profile.jpg'
import {Link , useNavigate} from 'react-router-dom'
import './SignUp.css'


function SignUp() {

  const [name , setName ] = useState('')
  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('')
  const navigate = useNavigate()
  // api state 
  const [signUpUser , { isLoading , error}] = useSignUpUserMutation()


  //image states

  const [image , setImage ] = useState(null)
  const [uploadingImage , setUploadingImage ] = useState(false)
  const [imagePreview , setImagePreview ] = useState(null)


  function validateImage(e){
 
     const file = e.target.files[0]
     if(file.size >= 1048576){
        
         return alert("Max file size is 1MB")
      }

     else{
         setImage(file)
         setImagePreview(URL.createObjectURL(file))
     } 
 
    }
 
async function uploadImage(){

  const data = new FormData()
  data.append('file', image)
  data.append('upload_preset' , 'gulpcyl5')

  try{
     setUploadingImage(true)
     let res = await fetch( "https://api.cloudinary.com/v1_1/dfd0e3qao/image/upload" , {
        
         method:'post',
         body:data

     })

     const urlData = await res.json();
     setUploadingImage(false);
     return urlData.url
  }

  catch(error){

    setUploadingImage(false)
    console.log(error)  

  }
}


 async function handleSignUp(e){
  
    e.preventDefault()
    
    if(!image) return alert("Please upload your profile picture")
    const url = await uploadImage(image)
    console.log(url)
 
    signUpUser({ name , email , password , pitcure:url }).then(({data}) => {

         if(data){
          console.log(data)
          navigate("/chat")
         }
    })
 
 }
  
  return (
    
    <Container fluid>
     <Row>
       <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
        <Form style={{width:"80%" , maxWidth:500}} onSubmit={handleSignUp}>
          
         <h1 className="text-center">Create Account</h1>

          <div className="signup-profile-pic_container">
             <img src={ imagePreview || BotImage} className="signup-profile-pic"/>
             <label htmlFor="image-upload"className="image-upload-label">
                 <i className="fas fa-plus-circle add-picture-icon"> </i>
             </label>
             
             <input type="file"id="image-upload" hidden accept="image/png,image/jpeg" onChange={validateImage}/>

          </div>

          {error && <p className='alert alert-danger'>{error.data}</p>}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your Name" onChange={ (e) => setName(e.target.value) } value={name} />
          </Form.Group>
          
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={ (e) => setEmail(e.target.value) } value={email} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } value={password} />
          </Form.Group>
          <Button variant="primary" type="submit">
            { uploadingImage || isLoading? 'Signing you up ' : 'Sign Up'}
          </Button>

          <div className="py-4">
            <p className="text-center">
              Already have an account? <Link to="/Login">Login</Link>
            </p>
          </div>

        </Form>
      </Col>
      
      <Col md={5} className="signup__bg"></Col>

    </Row>
  </Container>
  )
}

export default SignUp