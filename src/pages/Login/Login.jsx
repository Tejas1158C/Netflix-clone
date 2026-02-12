import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import background_banner from "../../assets/background_banner.jpg";
import { Link } from 'react-router-dom';
import {login, signup} from '../../firebase.js'
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {

  const[signState,setSignState] = useState("sign In");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event)=>{
    event.preventDefault();
    setLoading(true);
    if(signState==="Sign In"){
      await login(email,password);
    } else {
      await signup(name,email,password);
    }
    setLoading(false);
  }


  return (
    loading? <div className="netflix-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign In"?"":<input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Username' />}
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email or Phone Number' />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState==="Sign In"?"Sign In":"Sign Up"}</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch"> 
          {signState==="Sign In"?
          <p>New To Netflix? <Link onClick={()=>setSignState("Sign Up")}>Sign Up Now</Link></p>
          :<p>Already have an account? <Link onClick={()=>setSignState("Sign In")}>Sign In Now</Link></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
