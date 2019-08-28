import { createAppContainer, createStackNavigator } from 'react-navigation'
import MapScreen from '../screens/Map'
import Main from '../screens/Main'
import Add from '../screens/Add'
import styles from '../styles'

const MainNavigation = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: 'Map',
      headerBackTitle: null,
      headerTintColor: styles.darkGreyColor
    }
  },
  Add: {
    screen: Add,
    navigationOptions: {
      title: 'Add',
      headerBackTitle: null,
      headerTintColor: styles.darkGreyColor
    }
  }
})

export default createAppContainer(MainNavigation)
