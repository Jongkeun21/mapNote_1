import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import styles from '../styles'

const ListName = styled.Text`
  font-weight: 500;
  font-size: 15px;
  padding: 5px 3px;
  color: ${styles.darkBlueColor};
`
const ListAddress = styled.Text`
  font-weight: 200;
  font-size: 12px;
  color: ${styles.blueColor};
`

const ListValue = ({ title, subTitle }) => (
  <ListName>
    {title}
    {'\n'}
    <ListAddress>{subTitle}</ListAddress>
  </ListName>
)

ListValue.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

export default ListValue
