import { useEffect, useState } from 'react'
import * as F from '../helpers/helper-functions'
import EditGen from '../components/profile/EditGen'
import EditPref from '../components/profile/EditPref'
import EditStat from '../components/profile/EditStat'

export default function ProfileEdit(props) {
  const cred = props.authState.user
  const [tempCred, setTempCred] = useState({
    id: '',
    bio: '',
    gen: '',
    stat: '',
    pref: '',
    img: '',
  })

  // State variables for the name_img element
  const [url, setUrl] = useState(
    `https://crud-movie-chris.herokuapp.com/public/uploads/`
  )
  useEffect(() => {
    if (cred.img != undefined) {
      setUrl(
        () =>
          `https://crud-movie-chris.herokuapp.com/public/uploads/${cred.img}`
      )
      for (const key in tempCred) {
        setTempCred((obj) => ({ ...obj, [key]: cred[key] }))
      }
    }
  }, [cred])

  useEffect(() => {}, [tempCred])
  // State variables for the bday
  const [msg, setMsg] = useState({ loading: false, failed: false })
  const [edit, setEdit] = useState({
    bio: false,
    gen: false,
    stat: false,
    pref: false,
    img: false,
  })

  function handleCred(e) {
    const { name, value, files, type } = e.target
    const val = files === null ? value : files[0]
    if (type == 'file') {
      setUrl(URL.createObjectURL(files[0]))
    }
    setTempCred((old) => ({ ...old, [name]: val }))
  }

  async function authCred() {
    for (const key in tempCred) {
      if (tempCred[key] === '' && key != 'bio') {
        setMsg((old) => ({ ...old, failed: true }))
        return
      }
    }
    setMsg((old) => ({ ...old, loading: true }))

    const form = new FormData()
    for (const key in tempCred) {
      form.append(key, tempCred[key])
    }
    const res = await F.postReqForm(form, 'users/update', 'PUT')
    let data = await res.json()
    setTimeout(() => {
      props.setAuthState({
        status: true,
        user: data,
      })
      setMsg((old) => ({ loading: false, failed: false }))
      setEdit({
        bio: false,
        gen: false,
        stat: false,
        pref: false,
        img: false,
      })
    }, 800)
    // send to the backend get authenticated
  }

  return (
    <>
      <div
        className='edit-container fade'
        style={{ overflow: 'scroll', maxHeight: '100%' }}
      >
        <label className='edit-input'>
          <input
            onChange={handleCred}
            type='file'
            name='img'
            accept='image/gif, image/jpeg, image/png'
          />
        </label>
        <div
          style={{
            backgroundImage: `url('${url}')`,
          }}
          className='prof-img-container'
        ></div>
        <div className='details'>
          <div className='row' style={{ marginLeft: 'auto' }}>
            <h1 style={{ color: 'rgb(57 157 222)' }}>
              {cred.name},{' '}
              <small style={{ color: '#999' }}>{F.getAge(cred.bday)}</small>
            </h1>
          </div>
          <br />
          <div className='row'>
            <div style={{ marginRight: 'auto' }}>
              <small>Bio</small>
              {!edit.bio ? (
                <h3 style={{ color: '#999' }}>{cred.bio || 'N/A'}</h3>
              ) : (
                <input
                  style={{ marginLeft: '20px', textTransform: 'none' }}
                  type='text'
                  name='bio'
                  onChange={handleCred}
                  id=''
                />
              )}
            </div>

            {!edit.bio && (
              <div
                onClick={() => setEdit((obj) => ({ ...obj, bio: true }))}
                className='radio-edit'
              ></div>
            )}
          </div>
          <br />
          <div className='row'>
            <div style={{ marginRight: 'auto' }}>
              <small>Gender</small>
              {!edit.gen ? (
                <h3 style={{ color: '#999' }}>{cred.gen}</h3>
              ) : (
                <EditGen checked={cred.gen} handleCred={(e) => handleCred(e)} />
              )}
            </div>
            {!edit.gen && (
              <div
                onClick={() => setEdit((obj) => ({ ...obj, gen: true }))}
                className='radio-edit'
              ></div>
            )}
          </div>
          <br />
          <div className='row'>
            <div style={{ marginRight: 'auto' }}>
              <small>Status</small>
              {!edit.stat ? (
                <h3 style={{ color: '#999' }}>{cred.stat}</h3>
              ) : (
                <EditStat
                  checked={cred.stat}
                  handleCred={(e) => handleCred(e)}
                />
              )}
            </div>
            {!edit.stat && (
              <div
                onClick={() => setEdit((obj) => ({ ...obj, stat: true }))}
                className='radio-edit'
              ></div>
            )}
          </div>
          <br />
          {cred.stat == 'Single' && (
            <div className='row'>
              <div style={{ marginRight: 'auto' }}>
                <small>Preferences</small>
                {!edit.pref ? (
                  <h3 style={{ color: '#999' }}>{cred.pref}</h3>
                ) : (
                  <EditPref
                    checked={cred.pref}
                    handleCred={(e) => handleCred(e)}
                  />
                )}
              </div>
              {!edit.pref && (
                <div
                  onClick={() => setEdit((obj) => ({ ...obj, pref: true }))}
                  className='radio-edit'
                ></div>
              )}
            </div>
          )}
        </div>
        <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
          <div className='row' style={{ justifyContent: 'center' }}>
            <button onClick={authCred} className='edit-btn'>
              {msg.loading ? 'Saving...' : 'Save'}
            </button>
            {msg.loading && <div className='spin'></div>}
          </div>
          {msg.failed && (
            <label className='error-msg'>ERRORS IN YOUR SUBMITION</label>
          )}
        </div>
      </div>
    </>
  )
}
