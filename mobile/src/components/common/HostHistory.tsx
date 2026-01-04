import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Inbox, Server } from "lucide-react-native";
import { getData } from "../../services/storage";
import { Divider } from "../ui/Divider";

type HostItem = {
  ip: string;
  hostName: string;
  lastConnected?: string;
};

type Props = {
  refreshKey?: number;
};

export type HostHistoryHandle = {
  refresh: () => Promise<void>;
};

export const HostHistory = forwardRef<HostHistoryHandle, Props>(
  ({ refreshKey }: Props, ref) => {
    const [hosts, setHosts] = React.useState<HostItem[]>([]);

    const mountedRef = React.useRef(true);

    const load = useCallback(async () => {
      try {
        const raw = await getData("host-list");
        if (!mountedRef.current) return;
        if (raw) {
          const parsed = JSON.parse(raw) as HostItem[];
          setHosts(Array.isArray(parsed) ? parsed : []);
        } else {
          setHosts([]);
        }
      } catch (e) {
        console.error("Failed to load host-list", e);
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        refresh: load,
      }),
      [load]
    );

    React.useEffect(() => {
      mountedRef.current = true;
      load();
      return () => {
        mountedRef.current = false;
      };
    }, [load, refreshKey]);

    console.log("Loaded hosts:", hosts);

    return (
      <View className="w-full bg-white p-4 rounded border border-gray-600">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
            Saved Hosts
        </Text>
        <Divider />
        <View className="h-48">
          <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
            {hosts.length === 0 ? (
              <View className="w-full h-40 border border-dashed border-gray-400 rounded bg-white justify-center items-center p-6">
                <View className="items-center">
                  <View className="p-3 bg-yellow-100 rounded-full">
                    <Inbox size={24} color="#f59e0b" />
                  </View>
                  <Text className="mt-2 text-base font-medium text-amber-900">
                    No saved hosts
                  </Text>
                  <Text className="mt-1 text-sm text-gray-500 text-center max-w-xs">
                    Your saved hosts will appear here once you connect to a
                    device.
                  </Text>
                </View>
              </View>
            ) : (
              hosts.map((h, idx) => {
                const last = h.lastConnected ? new Date(h.lastConnected).toLocaleString() : ''
                return (
                  <TouchableOpacity
                    key={`${h.ip}-${idx}`}
                    activeOpacity={0.8}
                    className="w-full h-16 flex-row items-center bg-white mb-1"
                  >
                    <View className="p-2 mr-3 bg-gray-100 rounded-full ml-2">
                      <Server size={20} color="#0ea5e9" />
                    </View>

                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-900">{h.hostName || 'Unnamed host'}</Text>
                      <Text className="text-sm text-gray-600">{h.ip}</Text>
                    </View>

                    <View className="pr-3">
                      <Text className="text-xs text-gray-500">{last}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
);
