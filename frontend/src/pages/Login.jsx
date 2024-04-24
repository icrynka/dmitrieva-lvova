import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as F from '../helpers/helper-functions'
import _404 from '../components/_404'
export function Login(props) {
  const [cred, setCred] = useState({ user: '', pass: '' })
  const [msg, setMsg] = useState({ user: false, pass: false, failed: false })

  const navigate = useNavigate()
  async function authLogin() {
    const { user, pass } = cred
    if (user.length < 4 && pass.length < 4) {
      setMsg((obj) => ({ ...obj, user: true, pass: true }))
      return
    } else if (user.length < 4) {
      setMsg((obj) => ({ ...obj, user: true, pass: false }))
      return
    } else if (pass.length < 4) {
      setMsg((obj) => ({ ...obj, user: false, pass: true }))
      return
    }
    const res = await F.postReq(
      {
        user: user,
        pass: pass,
      },
      'users/login'
    )
    let data = await res.json()
    if (data.id) {
      props.setAuthState({
        status: true,
        user: data,
      })
      navigate(`/`)
    } else {
      setMsg((obj) => ({ ...obj, user: false, pass: false, failed: true }))
      return
    }
  }
  return (
    <>
      {props.authState.status ? (
        <_404 message={'Already Logged In'} />
      ) : (
        <div className='center col cover1'>
          <div className='center col fade'>
            <div className='center col'>
              <h1>Login</h1>
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className='center gap col'>
              <input
                placeholder=' Username'
                className='small-form-input'
                name='user'
                type='text'
                onChange={(e) => F.handleCred(e, setCred)}
              />
              <label className='error-msg'>
                {msg.user ? 'Invalid Username' : ''}
              </label>
              <input
                placeholder=' Password'
                className='small-form-input'
                name='pass'
                type='text'
                onChange={(e) => F.handleCred(e, setCred)}
              />
              <label className='error-msg'>
                {msg.pass ? 'Invalid Password' : ''}
              </label>
              <label className='error-msg'></label>
            </div>
          </div>
          <br />
          <button onClick={authLogin} className='sign_up_continue fade'>
            Login
          </button>
          <br />
          <label className='error-msg'>
            {msg.failed ? 'Incorrect user credientials' : ''}
          </label>
        </div>
      )}
    </>
  )
}
