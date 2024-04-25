import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import * as F from '../helpers/helper-functions'
import { nanoid } from 'nanoid'
//const socket = io.connect('https://crud-movie-chris.herokuapp.com')
const socket = io.connect('http://185.250.46.244:3265');

export default function CurrentPersonMsg(props) {
  const location = useLocation()
  const { roomId } = location.state
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  async function getMessages() {
    const chats = await F.wildReq(
      { id: props.sender.id },
      `users/chats/${roomId}`,
      'GET'
    )
    setMessageList(chats)
  }
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        roomId: roomId,
        uid: props.sender.id,
        author: props.sender.name,
        text: currentMessage,
        time: new Date().toLocaleString([], {
          weekday: 'short',
          month: 'short',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      await socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
      await F.postReq(
        {
          text: currentMessage,
          uid: props.sender.id,
          author: props.sender.name,
          time: messageData.time,
        },
        `users/chats/${roomId}`
      )
    }
  }
  useEffect(() => {
    if (props.sender.id) {
      getMessages()
      socket.emit('join_room', roomId)
    }
  }, [])
  useEffect(() => {
    if (props.sender.id) {
      console.log('in the receive')
      socket.on('receive_message', (data) => {
        setMessageList((list) => [...list, data])
      })
    }
  }, [socket])
  return (
    <>
      <div
        className='edit-container'
        style={{ overflow: 'scroll', maxHeight: '100%' }}
      >
        <div style={{ flex: 1, overflow: 'scroll' }}>
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={nanoid()}
                className={`message ${
                  props.sender.name === messageContent.author ? 'you' : 'other'
                }`}
                id={i}
              >
                <label
                  style={{
                    margin: '10px 10px 2px 10px',
                    textTransform: 'none',
                    fontSize: '0.7rem',
                  }}
                >
                  {messageContent.author === props.sender.name
                    ? 'You'
                    : messageContent.author}
                </label>
                <p className='message-content'>{messageContent.text}</p>{' '}
                <label
                  style={{
                    margin: '2px 10px',
                    textTransform: 'none',
                    fontSize: '0.75rem',
                  }}
                >
                  {messageContent.time}
                </label>
              </div>
            )
          })}
        </div>
        <br />
        <div className='row' style={{ minheight: '50px', maxWidth: '100%' }}>
          <input
            type='text'
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value)
            }}
            onKeyPress={(event) => {
              event.key === 'Enter' && sendMessage()
            }}
            placeholder='Type a message'
            style={{
              flex: 1,
              textTransform: 'none',
              height: '25px',
              fontSize: '0.95rem',
            }}
          />
          <div
            onClick={sendMessage}
            className='center'
            style={{
              color: '#48b5fb',
              cursor: 'pointer',
            }}
          >
            Send &#9658;
          </div>
        </div>
        <br />
      </div>
    </>
  )
}
