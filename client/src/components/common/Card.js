import React from 'react'

function Card(props) {
    return (
        <div className={`card ${props.classNames}`}>
            {props.children}
        </div>
    )
}

export default Card;