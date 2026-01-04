import { Cable } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  testID?: string;
};

export const Button = ({
  title,
  children,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
  testID,
}: Props) => {
  const base = "rounded-md px-4 py-3 items-center justify-center flex-row";
  const variantStyles: Record<string, string> = {
    primary: "bg-sky-500 border border-gray-600",
    secondary: "bg-orange-600 border border-gray-600",
    ghost: "bg-transparent border border-gray-600",
  };

  const textColor: Record<string, string> = {
    primary: "text-white",
    secondary: "text-gray-900",
    ghost: "text-gray-900",
  };

  const disabledClass = disabled ? "opacity-60" : "opacity-100";

  return (
    <TouchableOpacity
      onPress={disabled || loading ? undefined : onPress}
      className={`${base} ${variantStyles[variant]} ${disabledClass} ${className}`}
      disabled={disabled}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#0f172a" />
      ) : (
        <>
          <Cable size={16} color={"white"} />
          <Text className={`text-base ml-4 font-medium ${textColor[variant]}`}>
            {children ?? title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
