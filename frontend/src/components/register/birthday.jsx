import * as F from '../../helpers/helper-functions'
export default function Birthday(props) {
  return (
    <div className='center cover right_ani'>
      <div className='center col'>
        {props.info}
        <br />
        <h1>Birthday</h1>
      </div>
      <br />
      <input
        className='small-form-input'
        style={{ textTransform: 'uppercase', width: '70%', height: '80px' }}
        type='date'
        name='bday'
        max={F.max}
        onChange={props.handleCred}
      />
      <label className='error-msg'>{props.msg.bday}</label>
    </div>
  )
}
