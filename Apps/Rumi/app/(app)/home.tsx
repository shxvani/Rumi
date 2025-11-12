import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>Lumé</Text>
        <Pressable
          onPress={() => router.push("/(app)/settings" as any)}
          style={styles.settingsButton}
        >
          <Settings size={24} color="#2C2C2C" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.subtitle}>Create something beautiful today</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/(app)/editor?type=photo" as any)}
          >
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={styles.buttonTitle}>Edit Photo</Text>
            <Text style={styles.buttonSubtitle}>
              Apply filters and adjustments
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(app)/editor?type=video" as any)}
          >
            <Text style={styles.buttonIcon}>🎥</Text>
            <Text style={styles.buttonTitle}>Edit Video</Text>
            <Text style={styles.buttonSubtitle}>
              Transform short clips
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.galleryLink}
          onPress={() => router.push("/(app)/gallery" as any)}
        >
          <Text style={styles.galleryLinkText}>View Saved Edits</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: "300" as const,
    color: "#2C2C2C",
    letterSpacing: 2,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "600" as const,
    color: "#2C2C2C",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8B8B8B",
    marginBottom: 48,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: "600" as const,
    color: "#2C2C2C",
    marginBottom: 8,
  },
  buttonSubtitle: {
    fontSize: 15,
    color: "#8B8B8B",
  },
  galleryLink: {
    marginTop: 32,
    alignItems: "center",
    padding: 16,
  },
  galleryLinkText: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: "#C9A69A",
  },
});
