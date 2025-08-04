// frontend/app/auth/register.tsx

import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Facebook from "expo-facebook";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";

const FACEBOOK_APP_ID = "1043414487572723";

const Register = () => {
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isFbLoading, setIsFbLoading] = useState(false);
  const router = useRouter();
  const { signUp, facebookLogin } = useAuth();

  const handleSubmit = async () => {
    const name = nameRef.current.trim();
    const phone = phoneRef.current.trim();
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    // basic non-empty check
    if (!name || !phone || !email || !password) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }
    // enforce @gmail.com only
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      Alert.alert("Sign Up", "Please enter a valid Gmail address");
      return;
    }

    try {
      setIsSigningUp(true);
      await signUp(email, password, name, phone, "");
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      setIsFbLoading(true);
      await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID });
      const result: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (result.type === "success") {
        const accessToken =
          result.accessToken ??
          result.token ??
          (result.authentication as any)?.accessToken;
        if (!accessToken) {
          Alert.alert("Facebook Sign‑Up", "No access token returned");
        } else {
          await facebookLogin(accessToken);
        }
      } else if (result.type !== "cancel") {
        Alert.alert("Facebook Sign‑Up", `Unexpected type: ${result.type}`);
      }
    } catch (error: any) {
      Alert.alert(
        "Facebook Sign‑Up Error",
        error.message || "Something went wrong"
      );
    } finally {
      setIsFbLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper showPattern={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton iconSize={28} />
            <Pressable onPress={() => router.push("https://chatgpt.com/")}>
              <Typo size={17} color={colors.white}>
                Need some help?
              </Typo>
            </Pressable>
          </View>

          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={styles.form}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  gap: spacingY._10,
                  marginBottom: spacingY._15,
                }}
              >
                <Typo size={28} fontWeight={"600"}>
                  Getting Started
                </Typo>
                <Typo color={colors.neutral600}>
                  Create an Account to continue
                </Typo>
              </View>

              {/* Name Input */}
              <Input
                placeholder="Enter your name"
                onChangeText={(v: string) => (nameRef.current = v)}
                icon={
                  <Icons.UserIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />

              {/* Phone Number Input */}
              <Input
                placeholder="Enter your phone number"
                onChangeText={(v: string) => (phoneRef.current = v)}
                keyboardType="phone-pad"
                icon={
                  <Icons.PhoneCallIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />

              {/* Email Input */}
              <Input
                placeholder="Enter your email"
                onChangeText={(v: string) => (emailRef.current = v)}
                icon={
                  <Icons.EnvelopeIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />

              {/* Password Input */}
              <Input
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={(v: string) => (passwordRef.current = v)}
                icon={
                  <Icons.LockIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />

              <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                {/* Sign Up Button */}
                <Button loading={isSigningUp} onPress={handleSubmit}>
                  <Typo fontWeight={"bold"} color={colors.black} size={20}>
                    Sign Up
                  </Typo>
                </Button>

                {/* — or — Separator */}
                <View style={styles.separatorContainer}>
                  <View style={styles.separatorLine} />
                  <Typo color={colors.neutral600} style={styles.orText}>
                    or
                  </Typo>
                  <View style={styles.separatorLine} />
                </View>

                {/* Facebook Button */}
                <Button
                  style={{
                    backgroundColor: "#4267B2",
                    marginTop: spacingY._10,
                  }}
                  loading={isFbLoading}
                  onPress={handleFacebookSignUp}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icons.FacebookLogoIcon size={20} color="#fff" />
                    <Typo color="#fff" style={{ marginLeft: spacingX._10 }}>
                      Continue with Facebook
                    </Typo>
                  </View>
                </Button>

                {/* Login Link */}
                <View style={styles.footer}>
                  <Typo>Already have an account?</Typo>
                  <Pressable onPress={() => router.push("/(auth)/login")}>
                    <Typo fontWeight={"bold"} color={colors.green}>
                      Login
                    </Typo>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  form: {
    gap: spacingY._15,
    marginTop: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  /* Separator styles */
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacingY._15,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral400,
  },
  orText: {
    marginHorizontal: spacingX._10,
  },
});
