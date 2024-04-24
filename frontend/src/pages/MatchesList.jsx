import { useEffect, useState } from 'react'
import MatchesTab from '../components/MatchesTab'
import * as F from '../helpers/helper-functions'
import { nanoid } from 'nanoid'
export default function MatchesList(props) {
  const authState = props.authState
  const [matches, setMatches] = useState([])
  async function getMatches() {
    let res = await F.postReq(
      {
        uid: authState.user.id,
        pref: authState.user.pref,
        gen: authState.user.gen,
      },
      'users/matches'
    )
    const data = await res.json()
    setMatches(data)
  }
  useEffect(() => {
    if (authState.user.id) {
      getMatches()
    }
  }, [authState])

  const favs = matches.map((item) => (
    <MatchesTab
      key={nanoid()}
      id={item.id}
      matches={item.matches}
      authId={authState.user.id}
    />
  ))
  return (
    <>
      <div
        className='edit-container'
        style={{ overflow: 'scroll', maxHeight: '100%' }}
      >
        {favs}
        {favs.length < 1 && (
          <div className='center col hidden' style={{ height: '76vh' }}>
            <div className='row'>
              <h2>No Favorites</h2>
            </div>
            <br />
            <button
              style={{ padding: '15px 20px' }}
              onClick={() => navigate('/matches')}
              className='edit-btn'
            >
              Find Favorites
            </button>
          </div>
        )}
      </div>
    </>
  )
}
