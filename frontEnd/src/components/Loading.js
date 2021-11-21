import '../App.css';
import sample from '../logoLoading.mp4';
import React from 'react'

const Loading = () => {
    return (
        <div>
            <video className='videoTag' autoPlay loop muted>
                <source src={sample} type='video/mp4' />
            </video>
        </div>
    )
}
export default Loading;

{/* <header className="App-header">



</header> */}