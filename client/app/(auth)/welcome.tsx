import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/styling";
import Animated, { FadeIn } from "react-native-reanimated";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo color={colors.green} size={43} fontWeight={"900"}>
            Patch up
          </Typo>
        </View>
      </View>

      <Animated.Image
        entering={FadeIn.duration(700).springify()}
        source={require("../../assets/images/welcome-riders.png")}
        style={styles.welcomeImage}
        resizeMode={"contain"}
      />

      <View
        style={{
          flex: 1, // Takes all available space
          justifyContent: "center", // Centers children vertically
          alignItems: "center", // Centers children horizontally
        }}
      >
        <Typo
          color={colors.white}
          size={20}
          fontWeight="200"
          style={{ textAlign: "center" }} // Center text within its container
        >
          Vulcanize Anytime, Anywhere
        </Typo>

        <Button
          style={{
            backgroundColor: colors.white,
            alignSelf: "center", // Center the button itself
            marginTop: 20, // Add some space between text and button
            paddingHorizontal: 30, // Add horizontal padding for better appearance
          }}
          onPress={() => router.push("/(auth)/register")}
        >
          <Typo size={23} fontWeight={"bold"}>
            Get started
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.black,
  },
  welcomeImage: {
    height: verticalScale(300),
    aspectRatio: 1,
    alignSelf: "center",
  },
});
