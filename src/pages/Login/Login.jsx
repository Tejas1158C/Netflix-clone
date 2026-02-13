import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { login, signup, resetPassword } from '../../firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }

    setLoading(false);
  };

  const forgotPassword = async () => {
    await resetPassword(email);
  };

  return (
    loading ? (
      <div className="netflix-spinner">
        <img src={netflix_spinner} alt="" />
      </div>
    ) : (
      <div className='login'>

        <img src={logo} className='login-logo' alt="" />

        <div className="login-form">
          <h1>{signState}</h1>

          <form onSubmit={user_auth}>

            {signState === "Sign In" ? "" :
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Username'
              />
            }

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='Email'
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
            />

            <button type='submit'>
              {signState === "Sign In" ? "Sign In" : "Sign Up"}
            </button>

            <div className="form-help">
              <div className="remember-me">
                <input type="checkbox" />
                <label>Remember me</label>
              </div>

              {/* 🔥 FORGOT PASSWORD */}
              <p className="forgot" onClick={forgotPassword}>
                Forgot Password?
              </p>

            </div>
          </form>

          <div className="form-switch">
            {signState === "Sign In" ?
              <p>
                New to Netflix?
                <Link onClick={() => setSignState("Sign Up")}>
                  Sign Up Now
                </Link>
              </p>
              :
              <p>
                Already have account?
                <Link onClick={() => setSignState("Sign In")}>
                  Sign In
                </Link>
              </p>
            }
          </div>

        </div>
      </div>
    )
  )
}

export default Login