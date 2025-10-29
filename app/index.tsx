import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const navigateToHome = useCallback(() => {
    router.replace("/(app)/home" as any);
  }, [router]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(navigateToHome);
  }, [fadeAnim, navigateToHome]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logo}>Lumé</Text>
        <Text style={styles.tagline}>Artistry in every frame</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F4",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    gap: 12,
  },
  logo: {
    fontSize: 56,
    fontWeight: "300" as const,
    color: "#2C2C2C",
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#8B8B8B",
    letterSpacing: 1.5,
  },
});
