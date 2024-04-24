import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function _404(props) {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])
  return (
    <div className='center col' style={{ margin: '40px' }}>
      <h1>404 | {props.message || 'page not found'}</h1>
      <h3 style={{ color: '#48b5fb', marginTop: '10px' }}>Redirecting.....</h3>
    </div>
  )
}
