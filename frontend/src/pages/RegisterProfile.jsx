import logo from '../assets/movie1.png'
import check from '../assets/check.png'
import { useState } from 'react'
import * as F from '../helpers/helper-functions'
import { useNavigate } from 'react-router-dom'
import NameImg from '../components/register/name_img'
import Birthday from '../components/register/birthday'
import Gender from '../components/register/gender'
import Status from '../components/register/status'
import Preferences from '../components/register/preferences'
export default function Profile(props) {
  const navigate = useNavigate()
  const [cred, setCredentials] = useState({
    user: '',
    pass: '',
    img: '',
    name: '',
    bio: '',
    bday: '',
    gen: '',
    stat: '',
    pref: '',
  })
  const [form, setForm] = useState({
    onReg: true,
    onWelc: false,
    onN_I: false,
    onBday: false,
    onGen: false,
    onStat: false,
    onPref: false,
  })
  const [msg, setMsg] = useState({
    user: false,
    pass: false,
    img: false,
    name: false,
    bday: '',
    gen: false,
    pref: false,
    stat: false,
    failed: false,
  })

  const info = (
    <p className='small-info'>REGISTRATION PROGRESS IS LOST ON REFRESH</p>
  )
  const [className, setClassName] = useState('')
  const [url, setUrl] = useState('')

  async function handleCred(e) {
    const { name, value, files, type } = e.target
    let val = files === null ? value : files[0]
    if (type == 'file') {
      setClassName('new-img-upload')
      setUrl(URL.createObjectURL(files[0]))
    }
    setCredentials((old) => ({ ...old, [name]: val }))
  }

  function handleAuth(type) {
    const result = type(cred, setForm, setMsg)
    return result
  }
  const register = (
    <div className='center col cover1'>
      <div className='center col fade'>
        <div className='center col'>
          <h1>Register</h1>
          <br />
          <p className='small-info'>
            CREDENTIALS MUST BE AT LEAST 4 CHARACTERS
          </p>
          <br />
          <br />
        </div>
        <div className='center gap col'>
          <input
            placeholder=' Username'
            className='small-form-input'
            name='user'
            type='text'
            onChange={handleCred}
          />
          <label className='error-msg'>
            {msg.user ? 'Invalid Username' : ''}
            <label className='error-msg'>
              {msg.failed ? 'Username Taken' : ''}
            </label>
          </label>
          <input
            placeholder=' Password'
            className='small-form-input'
            name='pass'
            type='text'
            onChange={handleCred}
          />
          <label className='error-msg'>
            {msg.pass ? 'Invalid Password' : ''}
          </label>
        </div>
      </div>
      <br />
    </div>
  )
  const welcome = (
    <div className='center cover1 col right_ani' style={{ border: 'none' }}>
      <div className='center col left_ani'>
        <img src={logo} alt='' />
        <br />
        <h1>Welcome</h1>
      </div>
      <br />
      <p className='row'>
        <img className='icon' src={check} alt='' />
        Love
      </p>
      <p className='row'>
        <img className='icon' src={check} alt='' />
        Connect
      </p>
      <p className='row'>
        <img className='icon' src={check} alt='' />
        Netflix & Chill
      </p>
      <br />
      <br />
      <br />
    </div>
  )
  async function sendRegister() {
    const form = new FormData()
    for (const key in cred) {
      form.append(key, cred[key])
    }
    const res = await F.postReqForm(form, 'users/register')
    let data = await res.json()
    if (data.id) {
      props.setAuthState({
        status: true,
        user: data,
      })
      navigate(`/movie-client`)
    } else {
      console.log(error)
    }
  }
  return (
    <>
      <div className='center col' style={{ padding: '0px 2vw' }}>
        {form.onReg && register}
        {form.onWelc && welcome}
        {form.onN_I && (
          <NameImg
            info={info}
            url={url}
            className={className}
            handleCred={handleCred}
            msg={msg}
          />
        )}
        {form.onBday && (
          <Birthday info={info} handleCred={handleCred} msg={msg} />
        )}
        {form.onGen && <Gender info={info} handleCred={handleCred} msg={msg} />}
        {form.onStat && (
          <Status info={info} handleCred={handleCred} msg={msg} />
        )}
        {form.onPref && (
          <Preferences info={info} handleCred={handleCred} msg={msg} />
        )}
        <br />
        {form.onReg && (
          <button
            onClick={() => handleAuth(F.authReg)}
            className='sign_up_continue left_ani'
          >
            Continue
          </button>
        )}
        {form.onWelc && (
          <button
            onClick={() =>
              setForm((old) => ({ ...old, onWelc: false, onN_I: true }))
            }
            className='sign_up_continue fade'
          >
            Continue
          </button>
        )}
        {form.onN_I && (
          <button
            onClick={() => handleAuth(F.authN_I)}
            className='sign_up_continue fade'
          >
            Continue
          </button>
        )}
        {form.onBday && (
          <button
            onClick={() => handleAuth(F.authBday)}
            className='sign_up_continue fade'
          >
            Continue
          </button>
        )}
        {form.onGen && (
          <button
            onClick={() => handleAuth(F.authGen)}
            className='sign_up_continue fade'
          >
            Continue
          </button>
        )}
        {form.onStat && (
          <button
            onClick={() => {
              if (handleAuth(F.authStat) == true) sendRegister()
            }}
            className='sign_up_continue fade'
          >
            Continue
          </button>
        )}
        {form.onPref && (
          <button
            onClick={() => {
              if (handleAuth(F.authPref)) sendRegister()
            }}
            className='sign_up_continue fade'
          >
            Complete
          </button>
        )}
      </div>
    </>
  )
}
