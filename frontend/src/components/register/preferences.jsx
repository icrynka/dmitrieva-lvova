export default function Preferences(props) {
  return (
    <div className='center cover right_ani'>
      <div className='center col'>
        {props.info}
        <br />
        <h1>Show me</h1>
      </div>
      <div className='special_btn'>
        <div className='button'>
          <input
            type='radio'
            value='Women'
            name='pref'
            onChange={props.handleCred}
          />
          <label htmlFor='Women'>Women</label>
        </div>
        <div className='button'>
          <input
            type='radio'
            value='Men'
            name='pref'
            onChange={props.handleCred}
          />
          <label htmlFor='Men'>Men</label>
        </div>
        <div className='button'>
          <input
            type='radio'
            value='Other'
            name='pref'
            onChange={props.handleCred}
          />
          <label htmlFor='Other'>Other</label>
        </div>
      </div>
      <label className='error-msg'>
        {props.msg.pref ? 'Please choose a preferences' : ''}
      </label>
    </div>
  )
}
