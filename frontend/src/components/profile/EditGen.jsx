export default function EditGen(props) {
  return (
    <div className='radio-container'>
      <div className='radio-container'>
        <div>
          <input
            type='radio'
            name='gen'
            value='Woman'
            onChange={props.handleCred}
            defaultChecked={'Woman' === props.checked}
          />
          <label className='option'>Woman</label>
        </div>
        <div>
          <input
            type='radio'
            name='gen'
            value='Man'
            onChange={props.handleCred}
            defaultChecked={'Man' === props.checked}
          />
          <label className='option'>Man</label>
        </div>
        <div>
          <input
            type='radio'
            name='gen'
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
