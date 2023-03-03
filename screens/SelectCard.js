import React, { useLayoutEffect, useState, useContext, useEffect } from "react";

import { Text, Button } from "react-native-paper";

import { View, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Mercedes, Edit, Toyota, Tesla } from "../assets";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import { AntDesign } from 'react-native-vector-icons'; 
import { Ionicons } from 'react-native-vector-icons';

import styles from "./StyleScreen";

function SelectCard({ route }) {
  const data = route?.params?.param
  const navigation = useNavigation();
  const { setBookingDetails, bookingDetails, renderFetchData, setRenderFetchData } = useContext(AuthContext)
  const [vehicleId, setVehicleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [getVehicleData, setGetVehicleData] = useState();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const completePayment = () => {
    const options = {
      method: "POST",
      url: "https://splasheroo-backend.herokuapp.com/api/payment/charge",
      params: {},
      headers: {
        "content-type": "application/json",
      },
      data: {
        id_customer: data.userId,
        amount: data.total,
        id_service: data.serviceId
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          navigation.navigate("SuccessBooking", { param: data._id });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <SafeAreaView className="h-full bg-white">
        <View className="flex-row items-center px-4">
          <Text>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Text>
          <Text className="text-2xl ml-20 text-center">Select Card</Text>
        </View>
        <ScrollView className="px-4">
          <TouchableOpacity onPress={completePayment} className="bg-[#E5FCFF] rounded-2xl mt-3">
            <View className="flex-row justify-center items-center p-4">
              <View style={{ width: 50 }}>
              <AntDesign name="creditcard" size={50} color="black" />
              </View>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <Text>{data.cardDetails.brand}</Text>
                <Text>**** **** **** {data.cardDetails.last4}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SelectCard;
