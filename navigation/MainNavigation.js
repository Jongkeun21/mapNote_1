import { createAppContainer, createStackNavigator } from "react-navigation";
import MapScreen from "../screens/Map";
import Main from "../screens/Main";
import Search from "../screens/Search";
import styles from "../styles";
import Detail from "../screens/Detail";

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
      header: null
    }
  }
});

export default createAppContainer(MainNavigation);
