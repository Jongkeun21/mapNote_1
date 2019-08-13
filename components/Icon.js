import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Icon = ({ style, onPress, iconName, iconSize, iconColor }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
  </TouchableOpacity>
)

Icon.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string
}

export default Icon
