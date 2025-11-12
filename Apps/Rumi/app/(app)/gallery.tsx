import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { ArrowLeft, Image as ImageIcon, Trash2 } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_SIZE = (SCREEN_WIDTH - 48) / 2;

type SavedEdit = {
  id: string;
  originalUri: string;
  filter: string;
  intensity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  timestamp: number;
  type: "photo" | "video";
};

export default function GalleryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [edits, setEdits] = useState<SavedEdit[]>([]);

  const loadEdits = useCallback(async () => {
    try {
      const savedEdits = await AsyncStorage.getItem("lume_saved_edits");
      if (savedEdits) {
        setEdits(JSON.parse(savedEdits));
      }
    } catch (error) {
      console.error("Error loading edits:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEdits();
    }, [loadEdits])
  );

  const deleteEdit = useCallback(
    async (id: string) => {
      Alert.alert(
        "Delete Edit",
        "Are you sure you want to delete this edit?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                const updatedEdits = edits.filter((edit) => edit.id !== id);
                setEdits(updatedEdits);
                await AsyncStorage.setItem(
                  "lume_saved_edits",
                  JSON.stringify(updatedEdits)
                );
              } catch (error) {
                console.error("Error deleting edit:", error);
                Alert.alert("Error", "Failed to delete edit.");
              }
            },
          },
        ]
      );
    },
    [edits]
  );

  const renderItem = useCallback(
    ({ item }: { item: SavedEdit }) => (
      <Pressable style={styles.gridItem}>
        {item.originalUri && item.originalUri.length > 0 && (
          <Image
            source={{ uri: item.originalUri }}
            style={styles.gridImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.gridOverlay}>
          <Text style={styles.filterLabel}>{item.filter}</Text>
          <Pressable
            onPress={() => deleteEdit(item.id)}
            style={styles.deleteButton}
          >
            <Trash2 size={18} color={Colors.white} />
          </Pressable>
        </View>
      </Pressable>
    ),
    [deleteEdit]
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ImageIcon size={64} color={Colors.textLight} strokeWidth={1.5} />
      <Text style={styles.emptyTitle}>No saved edits yet</Text>
      <Text style={styles.emptyText}>
        Your edited photos and videos will appear here
      </Text>
      <Pressable
        style={styles.emptyButton}
        onPress={() => router.replace("/(app)/home" as any)}
      >
        <Text style={styles.emptyButtonText}>Start Editing</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Saved Edits</Text>
        <View style={styles.headerButton} />
      </View>

      <FlatList
        data={edits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  row: {
    gap: 16,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.3,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  gridOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.white,
    textTransform: "capitalize",
  },
  deleteButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyButton: {
    backgroundColor: Colors.accentDark,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.white,
  },
});
