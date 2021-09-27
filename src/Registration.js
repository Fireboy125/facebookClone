import React,{useState} from 'react'
import {auth,db} from './firebase'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import './Registration.css';
// import "firebase/firestore"

function Registration() {
  const history =useHistory("");
  const [firstname,setFirstname]=useState("")
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState([]);
  const [gender, setGender] = useState('');
  
  const register = (event) => {
        event.preventDefault();
        if (birthday[2] >= 2010) {
            return alert("You are not eligible to register to Facebook!")
        }
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth.user) {
                    auth.user.updateProfile({
                        displayName: firstname + " " + lastName,
                        photoURL: "https://i.ibb.co/1zmBtwr/84241059-189132118950875-4138507100605120512-n.jpg"
                    }).then((s) => {
                        db.collection('users').doc(auth.user.uid).set({
                            uid: auth.user.uid,
                            displayName: auth.user.displayName,
                            email: auth.user.email,
                            photoURL: "https://i.ibb.co/1zmBtwr/84241059-189132118950875-4138507100605120512-n.jpg",
                            birthday,
                            gender,
                            bio: ""
                        })
                            .then((r) => {
                                history.push("/")
                            })
                    })
                }
            })
            .catch((e) => {
                if (
                    e.message ===
                    "The password is invalid or the user does not have a password."
                ) {
                    alert("Please check your credentials again");
                } else if (
                    e.message ===
                    "There is no user record corresponding to this identifier. The user may have been deleted."
                ) {
                    history.push("/register");
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            });
    };
  return (
    <div className="registration">
      <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Facebook" className="fbb_logo"></img>
      <div className="registration_container">
        <h1>Sign Up</h1>
        <p>It's quick and easy</p>
        <div className="hr3">
          <form >
            <div className="row">
              <input 
              onChange={(e)=>{
                setFirstname(e.target.value)
              }}
              type="name" 
              className="register_Name" 
              placeholder="First Name"
              required/>
              <input 
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
              type="name" 
              className="register_Name" 
              placeholder="Last Name"
              required/>
            </div>
            <center>
              <input 
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              type="email" 
              placeholder="Email"
              required/>
            </center>
            <center>
              <input
              onChange={(e)=>{
                setPassword(e.target.value)
              }} 
              type="password" 
              placeholder="New Password"
              required/>
            </center>
            <h5 className="Register_date">Date Of Birth</h5>
            <div className="row">
              <select className="register_date2" 
              onChange={(e)=>setBirthday([...birthday,e.target.value])}>
                <option value="Day">Day</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select className="register_date3"
              onChange={(e)=>setBirthday([...birthday,e.target.value])}>
                <option value="Day">Month</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
              <select className="register_date3"
              onChange={(e)=>setBirthday([...birthday,e.target.value])}>
                <option value="Year">Year</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
              </select>
            </div>
            <h5 className="register_gender">Gender</h5>
            <div className="register_RadioContainer">
              <div className="wrapper">
                <label>Female</label>
                <input required type="radio" name="gender" value="Female"
                onChange={(e)=>setGender(e.target.value)}
                />
              </div>
              <div className="wrapper">
                <label >Male</label>
                <input required type="radio" name="gender" value="Male"
                onChange={(e)=>setGender(e.target.value)}
                />
              </div>
              <div className="wrapper">
                <label >Other</label>
                <input required type="radio" name="gender" value="Other"
                onChange={(e)=>setGender(e.target.value)}
                />
              </div>
            </div>
            <div className="register_Policy">
              <p >
                By Clicking Sign Up, you Agree to our <span>Terms</span>, <span>Data Policy</span> and <span>Cookie Policy</span>
                . You can receive SMS notifications from us and can opt out at
                ant time.
              </p>
            </div>
            <center>
              <button Onclick={register} type="submit" className="submit_submit">
                Sign Up
              </button>
            </center>
            <center>
              <Link to="/login">
                <p className="register_login">
                  Already have an account ?
                </p>
              </Link>
            </center>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
