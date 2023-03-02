import {useState, useEffect} from 'react';

import GetLocation from 'react-native-get-location';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

import {Location} from 'expo-location';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import MapView, {Callout, Circle, Marker} from 'react-native-maps';

const app = () => {
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [delta, setDelta] = useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [found, setFound] = useState(true);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setPin({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: 372,
            alignSelf: 'center',
            zIndex: 1,
            margin: 10,
          },
          listView: {
            backgroundColor: 'white',
          },
        }}
        onPress={(data, details = null) => {
          console.log(details);
          setPin({
            latitude: details?.geometry?.location.lat,
            longitude: details?.geometry?.location.lng,
          });
        }}
        query={{
          key: 'AIzaSyDHT7BzneZ4BDuC3D6TVmC4JOm7wZoZ_Ss',
          language: 'en',
        }}
      />
      <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.mapView}>
          {found === true ? (
            <MapView
              region={{
                latitude: pin.latitude,
                longitude: pin.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
              style={styles.map}>
              <Marker
                coordinate={pin}
                draggable={true}
                onDragStart={e => {
                  console.log('Dragstart', e.nativeEvent.coordinate);
                }}
                onDragEnd={e => {
                  setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                  console.log(pin);
                }}>
                <Callout>
                  <Text>Your Vehicle!</Text>
                </Callout>
              </Marker>
            </MapView>
          ) : (
            <ActivityIndicator
              style={{marginTop: 200}}
              color="red"
              size={'large'}
            />
          )}
        </View>
        <View
          style={{
            width: '100%',
            height: 400,
            backgroundColor: 'white',
          }}></View>
        <View
          style={{
            height: 300,
            width: '100%',
            position: 'absolute',

            backgroundColor: 'white',
            //margin: 10,
            alignSelf: 'center',
            elevation: 5,
            borderRadius: 10,
            top: 550,
            paddingTop: 10,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            //left: 20,
          }}>
          <View
            style={{
              marginTop: 10,
              width: 50,
              borderWidth: 1,
              borderColor: '#9B9B9B',
              height: 5,
              borderRadius: 10,
              marginBottom: 20,
              alignSelf: 'center',
            }}></View>
          <View>
            <Text style={{marginHorizontal: 20, fontSize: 16, marginTop: 10}}>
              Where's your Vehicle?
            </Text>
            <Text style={{padding: 20}}>
              Hold and Move the pin to highlight the correct location of your
              car - it really helps!
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                marginTop: 10,
              }}
              onPress={() => {
                navigation.navigate('ConfirmLocationScreen');
              }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    height: 500,
    width: '100%',
    maxHeight: 500,
  },
  map: {
    height: 500,
    width: '100%',
  },
});

export default app;
