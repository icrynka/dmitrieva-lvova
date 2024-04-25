import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileCard from '../components/profile/ProfileCard'

export default function ProfileTab(props) {
  const cred = props.authState.user
  const [url, setUrl] = useState(
    `http://185.250.46.244:3265/public/uploads/`
  )
  useEffect(() => {
    if (cred.img != undefined) {
      setUrl(
        () =>
          `http://185.250.46.244:3265/public/uploads/${cred.img}`
      )
    }
  }, [cred])
  return (
    <>
      <div className='edit-container center'>
        <ProfileCard cred={cred} url={url} />
        <br />
        <div className='row' style={{ gap: '10px' }}>
          <Link to='/profile-details-edit'>
            <button className='fade edit-btn fade'>Edit</button>
          </Link>
          <br />
          <button onClick={props.logOut} className='fade edit-btn fade'>
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}
