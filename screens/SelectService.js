import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator,Image } from 'react-native'
import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from 'react-native-vector-icons';
import { Button } from "react-native-paper";
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from 'react-native-vector-icons';
import axios from "axios";
import {back} from "../assets";


const SelectService = () => {
    const navigation = useNavigation();
    const { setBookingDetails, bookingDetails } = useContext(AuthContext)
    const { service } = bookingDetails;

    const [seletedService, setSelectedService] = useState([]);
    const [oneService, setOneService] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const loadService = () => {
        setIsLoading(true);
        const options = {
            method: "GET",
            url: "https://splasheroo-backend.herokuapp.com/api/service/all",
            params: {},
            headers: {
                "content-type": "application/json",
            }
        };

        axios
            .request(options)
            .then((response) => {
                setSelectedService(response.data.services);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });

    useEffect(() => {
        loadService();
    }, [])

    const handlesSlecteService = (item) => {
        setOneService(item);
    }

    const handleSummaryPage = () => {
        setBookingDetails({
            ...bookingDetails,
            service: oneService._id
        })
        navigation.navigate('summary', { param: oneService });
    }

    const handlePrevios = () => {
        navigation.navigate("pickdate");
      }

    return (
        <SafeAreaView className="bg-white">
            <View className="p-4 bg-white h-full">
                <View className="flex-row items-center px-4">
                    <Text onPress={handlePrevios}>
                     <Image source={back}/>
                    </Text>
                    <Text className="text-2xl ml-10 text-center">Select your service</Text>
                </View>
                <Text className="mt-3 ml-5 text-gray-600">Please select the type of service you would like</Text>
                {isLoading && <ActivityIndicator size="large" color="#0B646B" />}
                <ScrollView>
                    {seletedService.map((item) =>
                        <TouchableOpacity
                            onPress={() => handlesSlecteService(item)}
                            key={item._id}
                            className={oneService._id === item._id ?
                                "flex-row justify-between p-4 mt-4 bg-[#E5FCFF] items-center" :
                                "flex-row justify-between p-4 mt-4 bg-[#F6FBFF] items-center"}>
                            <View>

                                <Text className="text-lg mb-2">{item.serviceName}</Text>
                                {item.allService.map((services) =>
                                    <View key={services} className="flex-row">
                                        {/* <MaterialIcons name="done" size={17} color="black" /> */}
                                        <Text className="text-[#707070] ml-1">{services}</Text>
                                    </View>
                                )}
                            </View>
                            <View>
                                <Text className="text-2xl">£{item.price}</Text>
                                <Text className="text-[#707070]">{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
                <View className="px-4 text-white mt-5 mb-5">
                    <Button
                        className={!oneService._id ? "bg-[#E2EDF6]" : "bg-[#00BCD4]"}
                        // disabled={selectedTime}
                        mode="contained"
                        onPress={handleSummaryPage}
                    >
                        Next
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SelectService