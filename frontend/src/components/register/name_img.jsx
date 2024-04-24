export default function NameImg(props) {
  return (
    <div className='center cover1 right_ani'>
      <div className='center col'>
        {props.info}
        <label style={{ marginTop: '15px' }} className='custom-file-upload'>
          <div
            style={{ backgroundImage: `url('${props.url}')` }}
            className={`img-wrap img-upload ${props.className}`}
          >
            <img id='reg-prof-img' className='photo' />
          </div>
          <input
            onChange={props.handleCred}
            id='photo-upload'
            type='file'
            name='img'
            accept='image/gif, image/jpeg, image/png'
          />
        </label>
      </div>
      <label className='error-msg'>
        {props.msg.img ? 'Please provide a image' : ''}
      </label>
      <div className='center'>
        <input
          placeholder='Name'
          className='small-form-input'
          type='text'
          name='name'
          onChange={props.handleCred}
        />
      </div>
      <br />
      <label className='error-msg'>
        {props.msg.name ? 'Please Provide a name' : ''}
      </label>
      <div className='center'>
        <input
          placeholder='Bio'
          className='small-form-input'
          type='text'
          name='bio'
          onChange={props.handleCred}
        />
      </div>
    </div>
  )
}
