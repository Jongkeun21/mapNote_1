import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import styles from '../styles'

const Container = styled.View``
const Title = styled.Text`
  font-weight: 600;
  color: ${styles.darkBlueColor};
  font-size: 18px;
`
const SubTitle = styled.Text`
  margin-top: 10px;
  font-weight: 200;
  color: ${styles.blueColor};
  font-size: 13px;
`

const Info = ({ style, title, subTitle }) => (
  <Container style={style}>
    <Title>{title}</Title>
    <SubTitle>{subTitle}</SubTitle>
  </Container>
)

Info.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

export default Info
