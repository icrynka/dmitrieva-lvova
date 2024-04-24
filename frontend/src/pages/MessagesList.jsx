import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import PersonMsgTab from '../components/message/PersonMsgTab'
import * as F from '../helpers/helper-functions'
import { useNavigate } from 'react-router-dom'
export default function MessagesList(props) {
  const navigate = useNavigate()
  const [people, setPeople] = useState([])
  async function getRooms() {
    if (props.authState.user.id) {
      let data = await F.getReq(
        `users/display-rooms/${props.authState.user.id}`
      )
      if (data.error) {
      } else {
        setPeople(data)
      }
    }
  }

  useEffect(() => {
    getRooms()
  }, [])
  return (
    <>
      <div
        className='edit-container'
        style={{ overflow: 'scroll', maxHeight: '100%', width: '373px' }}
      >
        <div style={{ flex: 1 }}>
          {people.map((person) => (
            <PersonMsgTab key={nanoid()} person={person} />
          ))}
          {people.length < 1 && (
            <div className='center col hidden' style={{ height: '76vh' }}>
              <div className='row'>
                <h2>No Messages</h2>
              </div>
              <br />
              <button
                style={{ padding: '15px 20px' }}
                onClick={() => navigate('/matches')}
                className='edit-btn'
              >
                Make Connections
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
