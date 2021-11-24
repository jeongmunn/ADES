import '../App.css';
import sample from '../logoLoading.webm';
import React from 'react'

const Loading = () => {
    return (
        <div>
            <video className='videoTag' autoPlay loop muted>
                <source src={sample} type='video/webm' />
            </video>
        </div>
    )
}
export default Loading;