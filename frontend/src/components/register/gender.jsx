export default function Gender(props) {
  return (
    <div className='center cover right_ani'>
      <div className='center col'>
        {props.info}
        <br />
        <h1>Gender</h1>
      </div>
      <div className='special_btn'>
        <div className='button'>
          <input
            type='radio'
            value='Woman'
            name='gen'
            onChange={props.handleCred}
          />
          <label htmlFor='Woman'>Woman</label>
        </div>
        <div className='button'>
          <input
            type='radio'
            value='Man'
            name='gen'
            onChange={props.handleCred}
          />
          <label htmlFor='Man'>Man</label>
        </div>
        <div className='button'>
          <input
            type='radio'
            value='Other'
            name='gen'
            onChange={props.handleCred}
          />
          <label htmlFor='Other'>Other</label>
        </div>
      </div>
      <label className='error-msg'>
        {props.msg.gen ? 'Please choose a gender' : ''}
      </label>
    </div>
  )
}
