/***********************
 ******************* Fetch Requests
 *********************/

// send a post request that has a file as well
export const postReqForm = async (data, location, method = 'POST') => {
  return await fetch(`https://crud-movie-chris.herokuapp.com/${location}`, {
    method: method,
    mode: 'cors',
    credentials: 'include',
    body: data,
  })
}

// send standard json post request
export const postReq = async (data, location) => {
  return await fetch(`https://crud-movie-chris.herokuapp.com/${location}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  })
}

//send a standard get reqest
export const getReq = async (location) => {
  const res = await fetch(
    `https://crud-movie-chris.herokuapp.com/${location}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  )
  return await res.json()
}
export const wildReq = async (data, location, method) => {
  const res = await fetch(
    `https://crud-movie-chris.herokuapp.com/${location}`,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    }
  )
  return await res.json()
}
// special request for getting movies by genre
export const getMovieSByGenre = async (genre, favs) => {
  let page = 1
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=521d44d8624a2cc4b52addaa29413019&with_genres=${genre}&page=${page}`
  )
  const data = await res.json()
  const movies = data.results.slice().map((obj) => ({
    title: obj.title,
    overview: obj.overview,
    url: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${obj.poster_path}`,
    id: obj.id,
  }))
  return movies.filter((item) => !favs.includes(item.id))
}

//special request for getting specific movie data , used in the matches tab
export const getMovie = async (id) => {
  const res = await fetch(`
  https://api.themoviedb.org/3/movie/${id}?api_key=521d44d8624a2cc4b52addaa29413019&language=en-US`)
  const data = await res.json()
  const movie = {
    title: data.title,
    overview: data.overview,
    url: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
    status: data.status,
    tagline: data.tagline,
  }
  return movie
}

/***********************
 ******************* Registration Form Functions
 *********************/

export function handleCred(e, setCred) {
  const { name, value } = e.target
  setCred((old) => ({ ...old, [name]: value }))
}
export function getAge(date) {
  const dob = new Date(date)
  const month_diff = Date.now() - dob.getTime()
  const age_dt = new Date(month_diff)
  const year = age_dt.getUTCFullYear()
  const age = Math.abs(year - 1970)
  return age
}
export async function authReg(cred, setForm, setMsg) {
  const { user, pass } = cred
  if (user.length < 4 && pass.length < 4) {
    setMsg((obj) => ({ ...obj, user: true, pass: true }))
    return
  } else if (user.length < 4) {
    setMsg((obj) => ({ ...obj, user: true, pass: false }))
    return
  } else if (pass.length < 4) {
    setMsg((obj) => ({ ...obj, user: false, pass: true }))
    return
  }
  const res = await fetch(
    'https://crud-movie-chris.herokuapp.com/users/username_check',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ user: user }),
    }
  )
  let data = await res.json()
  if (data.message == true) {
    setMsg((obj) => ({ ...obj, user: false, pass: false }))
    setForm((old) => ({ ...old, onReg: false, onWelc: true }))
  } else {
    setMsg((obj) => ({ ...obj, user: false, pass: false, failed: true }))
    return
  }
}

//choose name and upload image
export function authN_I(cred, setForm, setMsg) {
  const { img, name } = cred
  if (name === '' && img === '') {
    setMsg((obj) => ({ ...obj, img: true, name: true }))
    return
  } else if (img === '') {
    setMsg((obj) => ({ ...obj, img: true, name: false }))
    return
  } else if (name === '') {
    setMsg((obj) => ({ ...obj, img: false, name: true }))
    return
  }
  setMsg((obj) => ({ ...obj, img: false, name: false }))
  setForm((obj) => ({ ...obj, onN_I: false, onBday: true }))
}

///birthday
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
export const max = `${year}-${month < 10 ? '0' : ''}${month}-${
  day < 10 ? '0' : ''
}${day}`

const MIN = `${+year - 18}${month < 10 ? '0' : ''}${month}${
  day < 10 ? '0' : ''
}${day}`
function ageAuth(BDAY) {
  return +BDAY - +MIN >= 1 ? true : false
}
export function authBday(cred, setForm, setMsg) {
  const { bday } = cred
  const BDAY = bday.replaceAll('-', '')
  let msg = 'Please provide a birthday'
  if (bday === '') {
    setMsg((obj) => ({ ...obj, bday: msg }))
    return
  } else if (ageAuth(BDAY) == true) {
    msg = 'must be 18 years old or above'
    setMsg((obj) => ({ ...obj, bday: msg }))
    return
  } else {
    setMsg((obj) => ({ ...obj, bday: '' }))
  }
  setForm((obj) => ({ ...obj, onBday: false, onGen: true }))
  return
}

// choose a gender
export function authGen(cred, setForm, setMsg) {
  const { gen } = cred
  if (gen === '') {
    setMsg((obj) => ({ ...obj, gen: true }))
    return
  } else {
    setMsg((obj) => ({ ...obj, gen: false }))
  }
  setForm((obj) => ({ ...obj, onGen: false, onStat: true }))
  return
}

//choose a status
export async function authStat(cred, setForm, setMsg) {
  const { stat } = cred
  if (stat === '') {
    setMsg((obj) => ({ ...obj, stat: true }))
    return false
  } else {
    setMsg((obj) => ({ ...obj, stat: false }))
  }
  if (stat == 'Taken') {
    setForm((obj) => ({ ...obj, onStat: false }))
    return true
  } else {
    setForm((obj) => ({ ...obj, onStat: false, onPref: true }))
    return false
  }
}

// choose a preference
export function authPref(cred, setForm, setMsg) {
  const { pref } = cred
  if (pref === '') {
    setMsg((obj) => ({ ...obj, pref: true }))
    return false
  } else {
    setMsg((obj) => ({ ...obj, pref: false }))
  }
  setForm((obj) => ({ ...obj, onPref: false }))
  return true
}
