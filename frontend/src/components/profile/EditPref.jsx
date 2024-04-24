export default function EditPref(props) {
  return (
    <div className='radio-container'>
      <div className='radio-container'>
        <div>
          <input
            type='radio'
            name='pref'
            value='Women'
            onChange={props.handleCred}
            defaultChecked={'Women' === props.checked}
          />
          <label className='option'>Women</label>
        </div>
        <div>
          <input
            type='radio'
            name='pref'
            value='Men'
            onChange={props.handleCred}
            defaultChecked={'Men' === props.checked}
          />
          <label className='option'>Men</label>
        </div>
        <div>
          <input
            type='radio'
            name='pref'
            value='Other'
            onChange={props.handleCred}
            defaultChecked={'Other' === props.checked}
          />
          <label className='option'>Other</label>
        </div>
      </div>
    </div>
  )
}
