import React from "react"
import { View, Text } from "react-native"

type Props = {
  text?: string
  className?: string
}

export const Divider = ({ text, className = "" }: Props) => {
  if (!text) {
    return <View className={`h-px bg-gray-600 my-4 w-full ${className}`} />
  }

  return (
    <View className={`flex-row items-center my-4 w-full ${className}`}>
      <View className="flex-1 h-px bg-gray-600" />
      <Text className="px-3 text-sm text-gray-500 font-semibold">{text}</Text>
      <View className="flex-1 h-px bg-gray-600" />
    </View>
  )
}