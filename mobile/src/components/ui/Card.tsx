import React from 'react'
import { View } from 'react-native'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: Props) => {
  return (
    <View className={`w-full bg-white border border-gray-600 rounded ${className}`}>
      {children}
    </View>
  )
}

export default Card
