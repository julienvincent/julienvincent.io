import { createFactory } from 'react'

export const div = createFactory('div')
export const p = createFactory('p')
export const a = createFactory('a')
export const text = createFactory('text')

import { Motion as motion } from 'react-motion'
export const Motion = createFactory(motion)
export { spring } from 'react-motion'