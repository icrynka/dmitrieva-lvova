export default function Card(props) {
  const movie = props.movie
  return (
    <>
      <div className='card' id={props.id}>
        <div
          className='center col match-movie-container'
          style={{
            width: '100%',
            boxShadow: 'none',
            backgroundColor: '#eaeaea',
          }}
        >
          <div className='center col'>
            <div
              className='movie-img'
              style={{
                backgroundImage: `url(${movie.url})`,
                height: '43vh',
                minWidth: '130%',
                backgroundSize: '80%',
              }}
            ></div>
          </div>
          <div
            style={{
              backgroundColor: '#b18a1f',
              padding: '10px',
              height: '15vh',
              width: '100%',
              border: '1px solid #eaeaea',
              overflow: 'scroll',
            }}
          >
            <p style={{ textAlign: 'center' }}>
              {movie.overview == ''
                ? 'Sorry for the inconvinece movie overview not available'
                : movie.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
