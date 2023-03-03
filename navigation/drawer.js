// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';

import * as React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';

import homeIcon from '../assets/home.png';
import bookingIcon from '../assets/Booking.png';
import carIcon from '../assets/car.png';
import accountIcon from '../assets/account.png';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import Bookings from '../screens/Bookings';
import GetVehicle from '../screens/GetVehicle';
import AccountDetails from '../screens/AccountDetails';

import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/Signup';
import StepForm from '../screens/StepForm';
import FindVehicle from '../screens/FindVehicle';
import TempScreen from '../screens/TempScreen';
import VerifyScreen from '../screens/VerifyScreen';
import AddCustomVehicle from '../screens/AddCustomVehicle';
import ConfirmLocationScreen from '../screens/ConfirmLocationScreen';
import ChooseVehicleScreen from '../screens/ChooseVehicle';

import AddVehicle from '../screens/AddVehicle';

import menuIcon from '../assets/menu.png';

import PickDate from '../screens/PickDate';
import SelectService from '../screens/SelectService';
import Summary from '../screens/Summary';
import CardDetail from '../screens/CardDetail';
import SelectCard from '../screens/SelectCard';
import SuccessBooking from '../screens/SuccessBooking';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import {useNavigation, DrawerActions} from '@react-navigation/native';

const FirstScreenStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmLocationScreen"
        component={ConfirmLocationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="stepForm"
        component={StepForm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindVehicle"
        component={FindVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verifyScreen"
        component={VerifyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addCustomVehicle"
        component={AddCustomVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Image
                    source={menuIcon}
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountDetails}
        options={{
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Image
                    source={menuIcon}
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="Vehicles"
        component={GetVehicle}
        options={{
          headerLeft: () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Image
                    source={menuIcon}
                    style={{
                      height: 45,
                      width: 45,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          header: () => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    backgroundColor: 'white',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(DrawerActions.toggleDrawer());
                    }}>
                    <Image
                      source={menuIcon}
                      style={{
                        height: 45,
                        width: 45,
                        marginTop: 15,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 100,
                      marginTop: 20,
                      color: '#00bcd4',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    SPLASHEROO
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Stack.Screen name="pickdate" component={PickDate} />
      <Stack.Screen name="SelectService" component={SelectService} />
      <Stack.Screen name="summary" component={Summary} />
      <Stack.Screen name="cardDetail" component={CardDetail} />
      <Stack.Screen name="selectCard" component={SelectCard} />
      <Stack.Screen
        name="SuccessBooking"
        component={SuccessBooking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseVehicleScreen"
        component={ChooseVehicleScreen}
      />
    </Stack.Navigator>
  );
};

const SecondScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SecondPage" component={Bookings} />
    </Stack.Navigator>
  );
};

const ThirdScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ThirdPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ThirdPage" component={AddVehicle} />
    </Stack.Navigator>
  );
};

const FourthScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FourthPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="FourthPage" component={AccountDetails} />
    </Stack.Navigator>
  );
};

function Mydrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#FFFFFF', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Drawer.Screen
          name="FirstPage"
          options={{
            drawerLabel: 'Home',
            title: 'First Stack',
            headerShown: false,
            drawerIcon: () => {
              return (
                <Image
                  source={homeIcon}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              );
            },
          }}
          component={FirstScreenStack}
        />
        <Drawer.Screen
          name="SecondPage"
          options={{
            drawerLabel: 'Bookings',
            title: 'Second Stack',
            drawerIcon: () => {
              return (
                <Image
                  source={bookingIcon}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              );
            },
          }}
          component={SecondScreenStack}
        />
        <Drawer.Screen
          name="ThirdPage"
          options={{
            drawerLabel: 'Vehicles',
            title: 'Third Stack',
            headerShown: false,
            drawerIcon: () => {
              return (
                <Image
                  source={carIcon}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              );
            },
          }}
          component={ThirdScreenStack}
        />
        <Drawer.Screen
          name="FourthPage"
          options={{
            drawerLabel: 'Account',
            title: 'Fourth Stack',
            headerShown: false,
            drawerIcon: () => {
              return (
                <Image
                  source={accountIcon}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              );
            },
          }}
          component={FourthScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Mydrawer;
