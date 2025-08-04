// client/app/auth/login.tsx

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

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isFbLoading, setIsFbLoading] = useState(false);
  const router = useRouter();
  const { signIn, facebookLogin } = useAuth();

  const handleSubmit = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();
    if (!email || !password) {
      return Alert.alert("Login", "Please fill in all fields");
    }

    try {
      setIsSigningIn(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert("Login Error", error?.message || "Something went wrong");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleFacebookLogin = async () => {
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
          Alert.alert("Facebook Login", "No access token returned");
        } else {
          await facebookLogin(accessToken);
        }
      } else if (result.type !== "cancel") {
        Alert.alert("Facebook Login", `Unexpected type: ${result.type}`);
      }
    } catch (error: any) {
      Alert.alert(
        "Facebook Login Error",
        error?.message || "Something went wrong"
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
            <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
              <Typo size={17} color={colors.white}>
                Forgot Your Password?
              </Typo>
            </Pressable>
          </View>

          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={styles.form}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                <Typo size={28} fontWeight="600">
                  Welcome Back
                </Typo>
                <Typo color={colors.neutral600}>We are happy to see you!</Typo>
              </View>

              <Input
                placeholder="Enter your email"
                onChangeText={(v) => (emailRef.current = v)}
                icon={
                  <Icons.EnvelopeIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />
              <Input
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={(v) => (passwordRef.current = v)}
                icon={
                  <Icons.LockIcon
                    size={verticalScale(26)}
                    color={colors.neutral600}
                  />
                }
              />

              <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                {/* Normal Login Button */}
                <Button loading={isSigningIn} onPress={handleSubmit}>
                  <Typo fontWeight="bold" color={colors.black} size={20}>
                    Login
                  </Typo>
                </Button>

                {/* ----- or ----- separator */}
                <View style={styles.separatorContainer}>
                  <View style={styles.separatorLine} />
                  <Typo color={colors.neutral600} style={styles.orText}>
                    or
                  </Typo>
                  <View style={styles.separatorLine} />
                </View>

                {/* Facebook Login Button */}
                <Button
                  style={{ backgroundColor: "#4267B2" }}
                  loading={isFbLoading}
                  onPress={handleFacebookLogin}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icons.FacebookLogoIcon size={20} color="#fff" />
                    <Typo color="#fff" style={{ marginLeft: spacingX._10 }}>
                      Continue with Facebook
                    </Typo>
                  </View>
                </Button>

                {/* Sign Up Link */}
                <View style={styles.footer}>
                  <Typo>Don’t have an account?</Typo>
                  <Pressable onPress={() => router.push("/(auth)/register")}>
                    <Typo fontWeight="bold" color={colors.green}>
                      Sign Up
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

export default Login;

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
