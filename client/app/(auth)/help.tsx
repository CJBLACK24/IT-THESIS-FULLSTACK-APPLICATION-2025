// frontend/app/auth/help.tsx

import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";

const HELP_TOPICS = [
  {
    label: "How to reset password",
    action: () =>
      Alert.alert(
        "Reset Password",
        'From the login screen, tap "Forgot Password" and follow the instructions.'
      ),
  },
  {
    label: "Why create an account?",
    action: () =>
      Alert.alert(
        "Why Create an Account?",
        "An account lets you save your preferences and access personalized support."
      ),
  },
  {
    label: "Contact support",
    action: () =>
      Alert.alert(
        "Contact Support",
        "Email us at support@patchup.example.com and we’ll get back to you within 24 hours."
      ),
  },
  {
    label: "Terms & Privacy",
    action: () =>
      Alert.alert(
        "Terms & Privacy",
        "Read our full terms and privacy policy at https://patchup.example.com/terms"
      ),
  },
];

export default function Help() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        <BackButton iconSize={28} />
        <Typo size={17} color={colors.white} style={styles.headerTitle}>
          Need some help?
        </Typo>
      </View>

      {/* Help topics list */}
      <ScrollView contentContainerStyle={styles.content}>
        {HELP_TOPICS.map((topic, idx) => (
          <Pressable key={idx} style={styles.topicItem} onPress={topic.action}>
            <Typo size={16} color={colors.text}>
              {topic.label}
            </Typo>
          </Pressable>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._25,
  },
  headerTitle: {
    marginLeft: spacingX._10,
  },
  content: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._20,
    gap: spacingY._15,
  },
  topicItem: {
    paddingVertical: spacingY._15,
    paddingHorizontal: spacingX._10,
    backgroundColor: colors.white,
    borderRadius: radius._10,
    // light shadow for iOS/Android
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
