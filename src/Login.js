import React,{useState} from 'react'
import './Login.css'
import {Link,useHistory} from 'react-router-dom'
import { auth } from './firebase'
import firebase from 'firebase'
function Login() {
  const history=useHistory("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const login=(user)=>{
    user.preventDefault();
    auth.signInWithEmailAndPassword(email,password).then((data)=>{
      
        const db=firebase.firestore();
        db.collection('users')
        .doc(data.user.uid)
        .update({
          isOnline:true
        })
      // const LoggedInUser={
      //   uid:auth.uid,

      // }
      history.push('/ab')
    }).catch((error)=>{
      if(error.message==="The password is invalid or the user does not have a password")
      {
        alert("Please check your credentials again")
      }
      else if(error.message==="There is no user record corresponding to this identifier. The user may have been deleted")
      {
        alert("Please check your credentials again")
      }
      else{
        alert(error.message)
      }
    })
  }
  return (
    <div className="login">
      <div className="left_container">
        <img className="fb_logo _8ilh img" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Facebook" ></img>
        <h2 class="left_text">Facebook helps you connect and share with the people in your life.</h2>
      </div>
      <div className="login_container">
        <form>
          <center>
            <input type="email" id="em" placeholder="Email address or phone number" onChange={(e)=>setEmail(e.target.value)}></input>
          </center>
          <center>
            <input type="password" id="ps" placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)}></input>
          </center>
          <center>
            <button onClick={login} id="bt" type="submit" className="lgn_btn" >Log In</button>
          </center>
          <center>
            <div className="sideInfo">
              <h5><a href="#" className="psw">Forgot Password?</a></h5>
              <hr className="hr_Line"/>
            </div>
          </center>
          <center>
            <div>
              <Link to="/register" className="new_acc">
                <button className="newAccBtn">Create New Account</button>
              </Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  )
}

export default Login
