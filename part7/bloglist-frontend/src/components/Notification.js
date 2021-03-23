import React from 'react'

import './Notification.css'

const Notification = ({ content, type }) => {
  if (!content) {
    return null
  }

  let className = 'message'
  if (type === 'success') {
    className += ' success'
  } else if (type === 'error') {
    className += ' error'
  }

  return (
    <div className={className}>{content}</div>
  )
}

export default Notification
