import React from 'React'
import styled from 'styled-components'
import constants from '../constants'
import styles from '../styles'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Text = styled.Text`
  font-weight: 600;
  font-size: 20px;
  color: ${styles.darkBlueColor};
`

export default () => {
  return (
    <Container>
      <Text>Add</Text>
    </Container>
  )
}
