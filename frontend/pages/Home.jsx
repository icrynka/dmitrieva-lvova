import logo from '../assets/movie1.png'
import { Link, useNavigate } from 'react-router-dom'
// import '../css/index.css'
import { useEffect } from 'react'
export default function Home(props) {
  return (
    <>
      {!props.authState.status ? (
        <div>
          <div className='center'>
            <img className='logo' src={logo} alt='' />
            <h1 className='logo-title'>MovieConnect</h1>
          </div>
          <br />
          <br />
          <div className='center box'>
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <Link to='/register-form'>
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
