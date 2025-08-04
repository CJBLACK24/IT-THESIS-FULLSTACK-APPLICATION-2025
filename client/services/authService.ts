  // client/services/authService.ts

  import { API_URL } from "@/constants";
  import axios from "axios";

  // export const API_URL = "https://xxxxx.ngrok-free.app"; // replace with actual ngrok backend URL

  export const login = async (
    email: string,
    password: string
  ): Promise<{ token: string }> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log("login error:", error);
      const msg = error?.response?.data?.msg || "Login Failed";
      throw new Error(msg);
    }
  };

  export const register = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null,
    phone?: string              
  ): Promise<{ token: string }> => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        phone,                    
        password,
        name,
        avatar,
      });
      return response.data;
    } catch (error: any) {
      console.log("register error:", error);
      const msg = error?.response?.data?.msg || "Registration Failed";
      throw new Error(msg);
    }
  };

  export const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; msg: string; pin?: string }> => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      return response.data; // now includes response.data.pin
    } catch (error: any) {
      console.log("forgotPassword error:", error);
      const msg = error?.response?.data?.msg || "Failed to send reset email";
      throw new Error(msg);
    }
  };
  export const resetPassword = async (
    token: string,
    password: string
  ): Promise<{ token: string }> => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        { password }
      );
      return response.data;
    } catch (error: any) {
      console.log("resetPassword error:", error);
      const msg = error?.response?.data?.msg || "Failed to reset password";
      throw new Error(msg);
    }
  };

  export const sendOtp = async (phone: string): Promise<{ success: boolean; msg: string }> => {
    const res = await axios.post(`${API_URL}/auth/send-otp`, { phone });
    return res.data;
  };

  export const verifyOtp = async (
    phone: string,
    code: string
  ): Promise<{ success: boolean; msg: string }> => {
    const res = await axios.post(`${API_URL}/auth/verify-otp`, { phone, code });
    return res.data;
  };

  /**
   * Sign in with Facebook
   */
  export const signInWithFacebook = async (
    accessToken: string
  ): Promise<{ token: string }> => {
    try {
      const response = await axios.post(`${API_URL}/auth/facebook`, {
        accessToken,
      });
      return response.data;
    } catch (error: any) {
      console.log("signInWithFacebook error:", error);
      const msg = error?.response?.data?.msg || "Facebook sign‑in failed";
      throw new Error(msg);
    }
  };
