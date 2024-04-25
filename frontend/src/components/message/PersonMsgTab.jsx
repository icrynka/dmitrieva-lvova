import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileCard from '../profile/ProfileCard'
import closeBtn from '../../assets/no.png'
export default function PersonMsgTab(props) {
  const [close, setClose] = useState(false)
  const [info, setInfo] = useState({})
  const [recentMsg, setRecentMsg] = useState(undefined)
  const [url, setUrl] = useState(
    `http://185.250.46.244:3265/public/uploads/`
  )
  useEffect(() => {
    if (props.person != undefined) {
      setUrl(
        () =>
          `http://185.250.46.244:3265/public/uploads/${props.person.info.img}`
      )
      setInfo(props.person.info)
      if (props.person.chats.length) {
        let str = props.person.chats[props.person.chats.length - 1].text
        if (str.length >= 45) {
          str = `${str.slice(0, 42)}...`
        }
        setRecentMsg(str)
      }
    }
  }, [])

  return (
    <>
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
                name: info.name,
                bio: info.bio,
                bday: info.bday,
                id: info.id,
              }}
              url={url}
              chat={false}
            />
          </div>
        ) : (
          ''
        )}
      </>
      {props.person.info ? (
        <div
          className='row'
          style={{
            margin: '25px 10px',
            maxHeight: '50px',
            alignItems: 'center',
          }}
        >
          <img
            src={url}
            alt=''
            style={{
              height: '45px',
              width: '45px',
              borderRadius: '50%',
              border: '1px solid #48b5fb',
              marginRight: '10px',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setClose((old) => !old)}
          />
          <Link
            to={`/message/room`}
            state={{ roomId: props.person.roomId }}
            className='col'
            style={{
              borderBottom: '1px solid #999999',
              width: '100%',
              paddingBottom: '5px',
            }}
          >
            <h2 style={{ fontSize: '1rem' }}>
              <b>{info.name}</b>
            </h2>
            <br />
            <label
              style={{
                maxHeight: '20px',
                textTransform: 'none',
              }}
            >
              {recentMsg != undefined ? recentMsg : 'Start chatting...'}
            </label>
            <br />
          </Link>
        </div>
      ) : (
        <div className='center cover'>
          <div className='row'>
            <h2>Loading...</h2>
            <div className='spin'></div>
          </div>
        </div>
      )}
    </>
  )
}
