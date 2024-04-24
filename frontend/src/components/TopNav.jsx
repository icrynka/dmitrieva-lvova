import { Link } from 'react-router-dom'
import logo from '../assets/movie1.png'
import mssg from '../assets/msg.png'
import profile from '../assets/profile.png'
import match from '../assets/match.png'
export default function TopNav() {
  return (
    <nav className='nav'>
      <Link to='/'>
        <div className='main-center'>
          <img className='logo' src={logo} alt='' />
          <h1 className='logo-title'>MovieConnect</h1>
        </div>
      </Link>
      <div className='links'>
        <Link to='/matches'>
          <img className='link-logo' src={match} alt='' />
        </Link>
        <Link to='/messages'>
          <img className='link-logo' src={mssg} alt='' />
        </Link>
        <Link to='/profile-details'>
          <img className='link-logo' src={profile} alt='' />
        </Link>
      </div>
    </nav>
  )
}
