import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const ClerkPublicKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (!isLoaded) return;
    console.log(segments);

    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
    console.log("isSignedIn", isSignedIn);
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={ClerkPublicKey!} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
};
export default RootLayout;
