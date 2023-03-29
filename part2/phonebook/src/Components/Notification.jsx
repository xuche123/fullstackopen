import React from 'react'

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    return (
        <div style={
            type === 0 ?
                { color: 'red', fontSize: 20, borderStyle: 'solid', padding: 10, marginBottom: 10 } :
                { color: 'green', fontSize: 20, borderStyle: 'solid', padding: 10, marginBottom: 10 }
        }>
            {message}
        </div>
    )
}

export default Notification