import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.number
}

export default Notification