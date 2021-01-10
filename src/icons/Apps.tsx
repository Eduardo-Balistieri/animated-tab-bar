import React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ICON_SIZE } from '../global/Parameters'
import { Colors } from '../global/styles/Colors'

interface AppsProps {
  isActive: boolean
}

const Apps = ({ isActive }: AppsProps) => (
  <Svg
    viewBox='0 0 512 512'
    width={ICON_SIZE}
    height={ICON_SIZE}
  >
    <Path
      fill={isActive ? Colors.active : Colors.inactive}
      d='M104 160a56 56 0 1156-56 56.06 56.06 0 01-56 56zM256 160a56 56 0 1156-56 56.06 56.06 0 01-56 56zM408 160a56 56 0 1156-56 56.06 56.06 0 01-56 56zM104 312a56 56 0 1156-56 56.06 56.06 0 01-56 56zM256 312a56 56 0 1156-56 56.06 56.06 0 01-56 56zM408 312a56 56 0 1156-56 56.06 56.06 0 01-56 56zM104 464a56 56 0 1156-56 56.06 56.06 0 01-56 56zM256 464a56 56 0 1156-56 56.06 56.06 0 01-56 56zM408 464a56 56 0 1156-56 56.06 56.06 0 01-56 56z'
    />
  </Svg>
)


export default Apps