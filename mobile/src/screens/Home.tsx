import { View, Text, ScrollView } from "react-native";
import QrScan from "../components/common/QrScan";
import { Divider } from "../components/ui/Divider";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Info } from "lucide-react-native";
import { HostHistory } from "../components/common/HostHistory";
import { useState, useRef } from "react";
import type { SelectedHost } from "../store/useHostStore";
import { storeData, getData } from "../services/storage";
import type { HostHistoryHandle } from "../components/common/HostHistory";

export const Home = () => {
  const [host, setHost] = useState<SelectedHost>({
    hostName: "",
    ip: "",
    lastConnected: new Date().toISOString(),
  });

  const hostHistoryRef = useRef<HostHistoryHandle | null>(null);

  const handleSave = async () => {
    try {
      // load existing list (if any), append new host, then save the array
      const raw = await getData("host-list")
      let list = [] as SelectedHost[]
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) list = parsed
        } catch (e) {
          console.warn('Failed to parse existing host-list, overwriting', e)
          list = []
        }
      }

      const newList = [...list, host]
      await storeData("host-list", JSON.stringify(newList))
      console.log("Host saved successfully")
      console.log('Saved hosts:', newList)
      // refresh host list via ref
      hostHistoryRef.current?.refresh()
    } catch (e) {
      console.error("Failed to save host", e)
    }

    setHost({ hostName: "", ip: "", lastConnected: new Date().toISOString() })
  };
  return (
    <ScrollView
      className="p-4 bg-orange-50/50"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <QrScan />
      <Divider className="my-4" text="Or connect manually" />
      <Card className="p-4 mb-4">
        <View className="flex-row items-center mb-4 gap-2">
          <View className="p-2 bg-teal-200 rounded-full">
            <Info size={20} color="#4B5563" />
          </View>
          <Text className="text-sm text-gray-600 flex-1">
            You can connect by entering the device's IP address or its hostname.
          </Text>
        </View>
        <Input
          value={host.hostName}
          onChangeText={(text) => setHost({ ...host, hostName: text })}
          placeholder="Host Name"
          className="mb-4"
        />
        <Input
          value={host.ip}
          onChangeText={(text) => setHost({ ...host, ip: text })}
          placeholder="Enter IP or hostname"
        />
        <Button
          onPress={handleSave}
          title="Connect"
          className="mt-4"
          variant="primary"
        />
      </Card>
      <HostHistory ref={hostHistoryRef} />
    </ScrollView>
  );
};
