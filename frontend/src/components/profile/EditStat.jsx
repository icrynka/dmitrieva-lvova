export default function EditStat(props) {
  return (
    <div className='radio-container'>
      <div className='radio-container'>
        <div>
          <input
            defaultChecked={'Single' === props.checked}
            type='radio'
            value='Single'
            name='stat'
            onChange={props.handleCred}
          />
          <label className='option'>Single</label>
        </div>
        <div>
          <input
            defaultChecked={'Taken' === props.checked}
            type='radio'
            value='Taken'
            name='stat'
            onChange={props.handleCred}
          />
          <label className='option'>Taken</label>
        </div>
      </div>
    </div>
  )
}
