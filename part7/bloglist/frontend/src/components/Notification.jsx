import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  
  const message = notification.message
  const type = notification.type
  if (message === null) {
    return null
  }

  return (
    <div
      className="notification"
      style={
        type === 0
          ? {
              color: 'red',
              fontSize: 20,
              borderStyle: 'solid',
              padding: 10,
              marginBottom: 10,
            }
          : {
              color: 'green',
              fontSize: 20,
              borderStyle: 'solid',
              padding: 10,
              marginBottom: 10,
            }
      }
    >
      {message}
    </div>
  )
}

export default Notification
