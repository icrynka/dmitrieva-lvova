import { useEffect, useState } from 'react'
import ProfileBox from './profile/ProfileBox'
import * as F from '../helpers/helper-functions'
import { nanoid } from 'nanoid'
export default function MatchesTab(props) {
  const [movie, setMovie] = useState({})
  async function getMovie() {
    const data = await F.getMovie(props.id)
    setMovie(data)
  }
  useEffect(() => {
    getMovie()
  }, [])
  const matches = props.matches.map((match) => (
    <ProfileBox authId={props.authId} key={nanoid()} match={match} />
  ))
  return (
    <div className='flex' style={{ flex: 1 }}>
      <br />
      <div
        className='center col match-movie-container'
        style={{ width: '100%' }}
      >
        <div
          className='center col'
          style={{
            minHeight: '100%',
            minWidth: '100%',
            backgroundColor: '#eaeaea',
            padding: '10px 0px',
          }}
        >
          <div
            className='movie-img'
            style={{
              backgroundImage: `url(${movie.url})`,
              height: '200px',
              width: '250px',
            }}
          ></div>
        </div>
        <div
          style={{
            backgroundColor: 'rgb(57 157 222)',
            padding: '0px 10px 10px 10px',
            color: '#fff',
          }}
        >
          <h3 style={{ textAlign: 'center', margin: '10px 0' }}>
            {movie.tagline}{' '}
          </h3>
          <h4
            style={{
              textAlign: 'center',
              color: '#f8c433',
              margin: '5px 0',
            }}
          >
            {movie.status}
          </h4>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className='matches-container' style={{ width: '100%' }}>
        {matches}
        {matches.length < 1 && <h3 style={{ color: '#999' }}>No matches</h3>}
      </div>
    </div>
  )
}
