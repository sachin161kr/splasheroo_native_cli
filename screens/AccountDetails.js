

import React, { useState, useEffect } from "react";
import { View, Text, BackHandler, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Mercedes, Edit, Toyota, Tesla } from "../assets";
import { useNavigation } from "@react-navigation/native";
import BookingCards from '../components/BookingCards'
import { Button, TextInput, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from 'react-native-vector-icons';

const AccountDetails = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [cardBrand, setCardBrand] = useState("");
    const [cardDigits, setCardDigits] = useState("");



    const loadData = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem('userId')
        const options = {
            method: "GET",
            url: `https://splasheroo-backend.herokuapp.com/api/customer/${value}`,
            params: {},
            headers: {
                "content-type": "application/json",
            }
        };

        axios
            .request(options)
            .then((response) => {
                const options = {
                    method: "GET",
                    url: `https://splasheroo-backend.herokuapp.com/api/bankCard/details/${value}`,
                    params: {},
                    headers: {
                        "content-type": "application/json",
                    }
                };

                axios
                    .request(options)
                    .then((response) => {
                        setCardBrand(response.data.brand);
                        setCardDigits(response.data.last4);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setFullName(response.data.customer.customer[0].fullName);
                setPhoneNumber(response.data.customer.customer[0].phone);
                setAddress(response.data.customer.customer[0].address);
                setEmail(response.data.customer.account[0].email)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        loadData();
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                navigation.navigate("Bookings");
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);
    
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        AsyncStorage.removeItem('userId');
        AsyncStorage.removeItem('userEmail');
        navigation.navigate("login");
      };

    return (
        <ScrollView className="px-3 h-full w-full bg-white">
            {isLoading ? <ActivityIndicator
                style={{ marginTop: 200 }}
                color="#0B646B"
                size={"large"}
            /> :
                <>
                    <View className="px-3">
                        <View className="px-3">
                            <Text className="mt-5 text-[17px] mb-2">Full Name</Text>
                            <TextInput
                                disabled
                                value={fullName}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3 mt-3">
                            <Text className="mt-5 text-[17px] mb-2">Email Address</Text>
                            <TextInput
                                disabled
                                value={email}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3 mt-3">
                            <Text className="mt-5 text-[17px] mb-2">Phone Number</Text>
                            <TextInput
                                disabled
                                value={phoneNumber}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        <View className="px-3 mt-3">
                            <Text className="mt-5 text-[17px] mb-2">Address</Text>
                            <TextInput
                                disabled
                                multiline
                                value={address}
                                mode="outlined"
                                className="bg-slate-100"
                            />
                        </View>
                        {cardBrand && 
                        <>
                        <Text className="mt-5 text-[17px] mb-2">Your Card</Text>
                        <TouchableOpacity className="bg-[#E5FCFF] rounded-2xl mt-3 px-3">
                            <View className="flex-row justify-center items-center p-4">
                                <View style={{ width: 50 }}>
                                    <AntDesign name="creditcard" size={50} color="black" />
                                </View>
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text>{cardBrand}</Text>
                                    <Text>**** **** **** {cardDigits}</Text>
                                </View>
                            </View>
                        </TouchableOpacity> 
                        </>}
                    </View>
                    <View className="px-4 mt-10">
                        <Button className="bg-[#00BCD4]" mode="contained"  onPress={handleLogout}>
                            Log Out
                        </Button>
                    </View>
                </>
            }
        </ScrollView>
    );
};

export default AccountDetails;