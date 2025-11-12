import { useRouter } from "expo-router";
import { ArrowLeft, Info, Star } from "lucide-react-native";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleRateApp = () => {
    Alert.alert(
      "Rate Lumé",
      "Thank you for using Lumé! Your feedback helps us improve.",
      [{ text: "OK" }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy Policy",
      "Lumé processes all photos locally on your device. No data is sent to external servers.",
      [{ text: "OK" }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About Lumé",
      "Lumé v1.0\nA beautiful, minimal photo and video filter editor.\n\nMade with ❤️",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <Pressable style={styles.item} onPress={handleAbout}>
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, styles.iconPrimary]}>
                <Info size={20} color={Colors.accentDark} />
              </View>
              <Text style={styles.itemText}>About Lumé</Text>
            </View>
          </Pressable>

          <Pressable style={styles.item} onPress={handleRateApp}>
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, styles.iconSecondary]}>
                <Star size={20} color="#F59E0B" />
              </View>
              <Text style={styles.itemText}>Rate App</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>

          <Pressable style={styles.item} onPress={handlePrivacy}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>Privacy Policy</Text>
            </View>
          </Pressable>
        </View>

        <Text style={styles.footer}>Lumé • Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  item: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPrimary: {
    backgroundColor: Colors.accent,
  },
  iconSecondary: {
    backgroundColor: "#FEF3C7",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: Colors.text,
  },
  footer: {
    fontSize: 13,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 24,
  },
});
