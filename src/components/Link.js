// @flow
import React from "react"

type Props = {
  children?: any,
  href: string
}

const Link = ({children, href, ...props}: Props) => {
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default Link
