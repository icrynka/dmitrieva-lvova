export default function Status(props) {
  return (
    <div className='center cover right_ani'>
      <div className='center col'>
        {props.info}

        <br />
        <h1>Status</h1>
      </div>
      <div className='special_btn'>
        <div
          className='button'
          style={{ opacity: '0.5', cursor: 'not-allowed' }}
        >
          <input
            type='radio'
            value='Taken'
            name='stat'
            disabled
            onChange={props.handleCred}
            style={{ cursor: 'not-allowed' }}
          />
          <label htmlFor='Woman'>Taken</label>
        </div>

        <div className='button'>
          <input
            type='radio'
            value='Single'
            name='stat'
            onChange={props.handleCred}
          />
          <label htmlFor='Single'>Single</label>
        </div>
      </div>
      <label className='error-msg'>
        {props.msg.gen ? 'Please choose a status' : ''}
      </label>
    </div>
  )
}
