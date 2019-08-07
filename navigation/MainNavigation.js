import { createAppContainer, createStackNavigator } from "react-navigation";
import MapScreen from "../screens/Map";
import Main from "../screens/Main";
import Search from "../screens/Search";
import SearchSample from "../screens/SearchSample";
import SearchSample2 from "../screens/SearchSample2";
import styles from "../styles";

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
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Search",
      headerBackTitle: null,
      headerTintColor: styles.darkGreyColor
    }
  },
  SearchSample: {
    screen: SearchSample,
    SearchSample: {
      title: "SearchSample",
      headerBackTitle: null,
      headerTintColor: styles.darkGreyColor
    }
  },
  SearchSample2: {
    screen: SearchSample2,
    SearchSample2: {
      title: "SearchSample2",
      headerBackTitle: null,
      headerTintColor: styles.darkGreyColor
    }
  }
});

export default createAppContainer(MainNavigation);
