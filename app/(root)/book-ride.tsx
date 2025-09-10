import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import * as WebBrowser from "expo-web-browser";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { icons, images } from "@/constants";
import { useAuth } from "@/lib/auth";
import { fetchAPI } from "@/lib/fetch";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";

const BookRide = () => {
  const {
    userAddress,
    destinationAddress,
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const { user } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);
  const [createdRide, setCreatedRide] = useState<any>(null);

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];

  const handleConfirmRide = async () => {
    try {
      const ride = await fetchAPI("/rides", {
        method: "POST",
        body: JSON.stringify({
          pickup_location: {
            latitude: userLatitude,
            longitude: userLongitude,
            address: userAddress,
          },
          dropoff_location: {
            latitude: destinationLatitude,
            longitude: destinationLongitude,
            address: destinationAddress,
          },
        }),
      });
      setCreatedRide(ride);
      setSuccess(true);
    } catch (error) {
      console.error("Error creating ride:", error);
      // Optionally, show an error message to the user
    }
  };

  const handlePayment = async () => {
    if (!createdRide) return;

    try {
      const response = await fetchAPI(`/payment/initialize/${createdRide.id}`, {
        method: "POST",
      });
      if (response.authorization_url) {
        await WebBrowser.openBrowserAsync(response.authorization_url);
        setSuccess(false);
        router.push("/(root)/(tabs)/home");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  return (
    <>
      <RideLayout title="Book Ride">
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-10">
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {driverDetails?.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular">
                  {driverDetails?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Ride Price</Text>
              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                ${driverDetails?.price}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
              <Text className="text-lg font-JakartaRegular">
                {formatTime(driverDetails?.time!)}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Car Seats</Text>
              <Text className="text-lg font-JakartaRegular">
                {driverDetails?.car_seats}
              </Text>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center mt-5">
            <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
              <Image source={icons.to} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {userAddress}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
              <Image source={icons.point} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {destinationAddress}
              </Text>
            </View>
          </View>

          <CustomButton
            title="Confirm Ride"
            className="my-10"
            onPress={handleConfirmRide}
          />
        </>
      </RideLayout>
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Proceed to Payment"
            onPress={handlePayment}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default BookRide;
