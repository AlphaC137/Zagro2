import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

interface RideLayoutProps {
  children: React.ReactNode;
  title: string;
}

const RideLayout = ({ children, title }: RideLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <View className="flex-1 px-5">
        <View className="flex flex-row items-center justify-between mb-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="justify-center items-center w-10 h-10 rounded-full bg-white"
          >
            <Image source={icons.backArrow} className="w-4 h-4" />
          </TouchableOpacity>

          <Text className="text-2xl font-JakartaExtraBold">{title}</Text>

          <View className="w-10" />
        </View>

        {children}
      </View>
    </SafeAreaView>
  );
};

export default RideLayout;
