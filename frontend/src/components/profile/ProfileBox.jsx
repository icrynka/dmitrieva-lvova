import * as F from '../../helpers/helper-functions'
import ProfileCard from './ProfileCard'
import { useState } from 'react'
import closeBtn from '../../assets/no.png'
export default function ProfileBox(props) {
  const match = props.match
  const [close, setClose] = useState(false)
  const [url, setUrl] = useState(
    `http://185.250.46.244:3265/public/uploads/` + match.img
  )
  function openBox() {
    if (close) {
      setClose(false)
    } else {
      setClose(true)
    }
  }
  return (
    <>
      {close ? (
        <div
          style={{
            position: 'absolute',
            top: '57px',
            zIndex: '5000',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '11% 9%',
          }}
        >
          <img
            src={closeBtn}
            className='fade2 close'
            onClick={() => setClose((old) => !old)}
          />
          <ProfileCard
            cred={{
              name: match.name,
              bio: match.bio,
              bday: match.bday,
              id: match.uid,
            }}
            url={url}
            styles={{
              maxHeight: '30vh',
              minWidth: '8vw',
              padding: '0px 2vw',
              margin: '6vh 0px',
            }}
            chat={true}
            authId={props.authId}
          />
        </div>
      ) : (
        ''
      )}

      <div className='center col profile-box' onClick={openBox}>
        <img
          src={url}
          alt=''
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            border: '1px solid #f8c433',
            margin: '0px',
          }}
        />
        <div className='row'>
          <h6
            style={{
              color: '#999',
              textTransform: 'capitalize',
              marginTop: '5px',
            }}
          >
            {match.name}
          </h6>
        </div>
      </div>
    </>
  )
}
