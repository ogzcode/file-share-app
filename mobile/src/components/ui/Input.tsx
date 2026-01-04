import React from 'react'
import { View, TextInput, Text, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  label?: string
  error?: string
  className?: string
}

export const Input = ({ label, error, className = '', ...rest }: Props) => {
  const borderClass = error ? 'border-red-400 border-2' : 'border-gray-600 border'

  return (
    <View className={`w-full ${className}`}>
      {label ? <Text className="mb-2 text-sm text-gray-700">{label}</Text> : null}

      <TextInput
        className={`rounded-md px-3 py-3 bg-white text-base ${borderClass}`}
        {...rest}
      />

      {error ? <Text className="mt-1 text-xs text-red-500">{error}</Text> : null}
    </View>
  )
}

export default Input
