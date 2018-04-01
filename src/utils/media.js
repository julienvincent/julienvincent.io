// @flow
import {css} from "styled-components"

type MediaProps = Array<any>

export const media = {
  phone: (...args: MediaProps) => css`
    @media (max-width: 480px) {
      ${css(...args)};
    }
  `
}
