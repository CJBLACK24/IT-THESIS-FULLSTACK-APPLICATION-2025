import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/types";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({
  style,
  children,
  isModal = false,
}: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
  let paddingBottom = 0;

  if (isModal) {
    paddingTop = Platform.OS === "ios" ? height * 0.02 : 45;
    paddingBottom = height * 0.02;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0D0D0D", // ✅ Use custom background color
      }}
    >
      <View
        style={[
          {
            paddingTop,
            paddingBottom,
            flex: 1,
          },
          style,
        ]}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
