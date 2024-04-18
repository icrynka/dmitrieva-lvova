import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/RegisterProfile'
import { Login } from './pages/Login'
import _404 from './components/_404'
import TopNav from './components/TopNav'
import './css/index.css'
import './css/main.css'
import './css/registration.css'
import './css/edit-profile.css'
import './css/matches-messages.css'
import ProfileEdit from './pages/ProfileEdit'
import ProfileTab from './pages/ProfileTab'
import MessagesList from './pages/MessagesList'
import CurrentPersonMsg from './pages/CurrPersonMsgs'
import * as F from './helpers/helper-functions'
import Card from './components/deck/Card'
import { nanoid } from 'nanoid'
import no from './assets/x.png'
import fav from './assets/heart.png'
import MatchesList from './pages/MatchesList'
import { useNavigate } from 'react-router-dom'

function App() {
  const [authState, setAuthState] = useState({
    status: false,
    user: {},
  })
  const navigate = useNavigate()

  const [deck, setDeck] = useState([])
  const location = useLocation()
  const [hide, setHide] = useState(true)
  const [refresh, setRefresh] = useState(false)
  async function onSwipe(dir) {
    const container = document.querySelector('.main-screen')
    if (dir === 'right') {
      container.lastChild.classList.add('swipe-right')
      await F.postReq(
        { title: deck[0].id, love: 'y' },
        `users/faves/${authState.user.id}`
      )
    } else {
      container.lastChild.classList.add('swipe-left')
      await F.postReq(
        { title: deck[0].id, love: 'n' },
        `users/faves/${authState.user.id}`
      )
    }

    setTimeout(() => setDeck((old) => old.slice(1)), 1000)
  }
  async function checkAuth() {
    let data = await F.getReq('users/auth')
    if (data.error) {
    } else {
      setAuthState(data)
      if (data.user.id) {
        getDeck(data.user.id)
      }
    }
  }
  async function logOut() {
    await F.wildReq({}, 'users/auth/logout', 'DELETE')
    setAuthState({
      status: false,
      user: {},
    })
    navigate('/')
  }
  async function getDeck(id, genre = 27) {
    if (id || authState.user.id) {
      let page = 1
      let result = true
      while (result) {
        try {
          const favs = await F.getReq(`users/faves/${id || authState.user.id}`)
          const movies = await F.getMovieSByGenre(genre, favs, page)
          if (movies.length > 1) {
            setDeck(movies)
            result = false
          } else {
            page += 1
            result = true
          }
        } catch (err) {
          location.reload()
        }
      }
    }
  }
  function handleGenre() {
    const allGenre = document.querySelectorAll('.genre')
    allGenre[3].classList.remove('default-genre')
    allGenre.forEach((element) => element.classList.toggle('default-genre'))
  }
  useEffect(() => {
    if (!authState.status) {
      checkAuth()
    }
    if (location.pathname == '/') {
      if (deck.length < 1 && authState.status) {
        getDeck()
      }
      setHide(false)
    } else {
      setHide(true)
    }
  }, [location, refresh])

  const movieDeck = deck
    .map((obj, i) => <Card id={`card${i}`} key={nanoid()} movie={obj} />)
    .reverse()

  return (
    <>
      <div className='grey-box'></div>
      <div
        className='main-container right_ani'
        style={{ paddingTop: `${authState.user.id ? '5px' : '30px'}` }}
      >
        {authState.status && <TopNav />}
        <div className='main-screen'>
          {movieDeck.length < 1 && authState.status && (
            <div className='flex'>
              <div className='row'>
                <h2>Loading...</h2>
                <div className='spin'></div>
              </div>
              <br />
              <br />
              <button
                onClick={() => setRefresh((old) => !old)}
                className='edit-btn hidden'
              >
                Refresh
              </button>
            </div>
          )}
          {!hide && <>{authState.status ? <>{movieDeck}</> : <></>}</>}

          <Routes>
            <Route path='/' element={<Home authState={authState} />} />
            <Route
              path='/register-form'
              element={
                <Profile
                  authState={authState}
                  setAuthState={(newState) => setAuthState(newState)}
                />
              }
            />
            <Route
              path='/login'
              element={
                <Login
                  authState={authState}
                  setAuthState={(newState) => setAuthState(newState)}
                />
              }
            />
            <Route
              path='*'
              element={
                <_404
                  message={`${
                    authState.user.id ? 'Page Not Found' : 'Not Logged In'
                  }`}
                />
              }
            />
            {authState.user.id && (
              <>
                <Route
                  path='/matches'
                  element={<MatchesList authState={authState} />}
                />
                <Route
                  path='/messages'
                  element={<MessagesList authState={authState} />}
                />
                <Route
                  path='/profile-details'
                  element={<ProfileTab logOut={logOut} authState={authState} />}
                />
                <Route
                  path='/profile-details-edit'
                  element={
                    <ProfileEdit
                      setAuthState={(newState) => setAuthState(newState)}
                      authState={authState}
                    />
                  }
                />
                <Route
                  path='/message/room'
                  element={
                    <CurrentPersonMsg
                      sender={{
                        id: authState.user.id,
                        name: authState.user.name,
                      }}
                    />
                  }
                />
              </>
            )}
          </Routes>
        </div>
        {authState.status && (
          <nav className='bottom-nav'>
            <div id='icon-center' className='msg'>
              <img onClick={() => onSwipe('left')} src={no} alt='' />
            </div>
            {!hide && (
              <>
                {authState.status ? (
                  <div className='genre-select'>
                    <div
                      onClick={() => getDeck(authState.user.id, 35)}
                      className='genre'
                    >
                      Comedy
                    </div>
                    <div
                      onClick={() => getDeck(authState.user.id, 10749)}
                      className='genre'
                    >
                      Romance
                    </div>
                    <div
                      onClick={() => getDeck(authState.user.id, 27)}
                      className='genre'
                    >
                      Horror
                    </div>
                    <div
                      onClick={handleGenre}
                      style={{
                        backgroundColor: '#48b5fb',
                        color: '#fff',
                        textShadow: 'none',
                      }}
                      className='genre default-genre'
                    >
                      Genre
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            <div id='icon-center' className='profile'>
              <img onClick={() => onSwipe('right')} src={fav} alt='' />
            </div>
          </nav>
        )}
      </div>
      <div className='grey-box'></div>
    </>
  )
}

export default App
