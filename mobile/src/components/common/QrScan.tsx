import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { QrCode } from 'lucide-react-native'

type Props = {
  onPress?: () => void
  title?: string
  description?: string
  testID?: string
}

export default function QrScan({ onPress, title = 'Scan QR Code', description = 'Scan the QR code to share files', testID }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-full h-60 border-2 border-dashed border-gray-600 rounded bg-white justify-center items-center"
      testID={testID}
    >
      <View className="items-center">
        <QrCode size={72} color="#0ea5e9" />
        <Text className="mt-4 text-base font-medium text-gray-900">{title}</Text>
        <Text className="mt-1 text-sm text-gray-500 text-center">{description}</Text>
      </View>
    </TouchableOpacity>
  )
}
