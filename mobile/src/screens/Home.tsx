import { View, Text, ScrollView } from "react-native";
import QrScan from "../components/common/QrScan";
import { Divider } from "../components/ui/Divider";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Info } from "lucide-react-native";
import HostHistory from "../components/common/HostHistory";

export const Home = () => {
  return (
    <ScrollView className="p-4 bg-orange-50/50" contentContainerStyle={{ paddingBottom: 24 }}>
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
        <Input placeholder="Host Name" className="mb-4" />
        <Input placeholder="Enter IP or hostname" />
        <Button title="Connect" className="mt-4" variant="primary" />
      </Card>
      <HostHistory />
    </ScrollView>
  );
};
