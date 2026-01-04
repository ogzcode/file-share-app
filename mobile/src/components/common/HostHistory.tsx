import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Inbox, Server } from 'lucide-react-native'
import { getData } from '../../services/storage'

type HostItem = {
  ip: string
  hostName: string
  lastConnect?: string
}

export const HostHistory = () => {
  const [hosts, setHosts] = React.useState<HostItem[]>([])

  React.useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const raw = await getData('host-list')
        if (!mounted) return
        if (raw) {
          const parsed = JSON.parse(raw) as HostItem[]
          setHosts(Array.isArray(parsed) ? parsed : [])
        }
      } catch (e) {
        console.error('Failed to load host-list', e)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <View className="w-full">
      <View className="h-60">
        <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
          {hosts.length === 0 ? (
            <View className="w-full h-40 border border-dashed border-gray-400 rounded bg-white justify-center items-center p-6">
              <View className="items-center">
                <View className="p-3 bg-yellow-100 rounded-full">
                    <Inbox size={24} color="#f59e0b" />
                </View>
                <Text className="mt-2 text-base font-medium text-amber-900">No saved hosts</Text>
                <Text className="mt-1 text-sm text-gray-500 text-center max-w-xs">Your saved hosts will appear here once you connect to a device.</Text>
              </View>
            </View>
          ) : (
            hosts.map((h, idx) => (
              <TouchableOpacity
                key={`${h.ip}-${idx}`}
                activeOpacity={0.8}
                className="w-full h-32 border-2 border-dashed border-gray-600 rounded bg-white justify-center items-center mb-3"
              >
                <View className="items-center">
                  <Server size={36} color="#0ea5e9" />
                  <Text className="mt-3 text-base font-medium text-gray-900">{h.hostName || 'Unnamed host'}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{h.ip}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default HostHistory
