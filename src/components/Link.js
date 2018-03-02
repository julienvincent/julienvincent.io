// @flow
import React from "react"

const Link = ({children, href, ...props}) => {
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default Link
