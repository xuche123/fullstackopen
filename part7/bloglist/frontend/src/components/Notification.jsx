import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  // const type = useSelector(({ type }) => type)
  const type = 1
  if (notification === null) {
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
      {notification}
    </div>
  )
}

export default Notification
