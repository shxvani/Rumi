import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { ArrowLeft, Download, Share2, Sparkles, Sun, Contrast as ContrastIcon, Droplets, Flame, Highlighter, Moon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image as RNImage,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import Svg, { Defs, FeColorMatrix, Filter as SvgFilter, Image as SvgImage } from "react-native-svg";

import Colors from "@/constants/colors";
import { Filter, FILTERS, applyFilterAdjustments } from "@/constants/filters";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type MediaType = "photo" | "video";

type EditMode = "filters" | "brightness" | "contrast" | "saturation" | "warmth" | "highlights" | "shadows";

type EditOption = {
  id: EditMode;
  label: string;
  icon: React.ComponentType<any>;
  min: number;
  max: number;
  default: number;
};

const EDIT_OPTIONS: EditOption[] = [
  { id: "filters", label: "Filters", icon: Sparkles, min: 0, max: 100, default: 100 },
  { id: "brightness", label: "Brightness", icon: Sun, min: -100, max: 100, default: 0 },
  { id: "contrast", label: "Contrast", icon: ContrastIcon, min: -100, max: 100, default: 0 },
  { id: "saturation", label: "Saturation", icon: Droplets, min: -100, max: 100, default: 0 },
  { id: "warmth", label: "Warmth", icon: Flame, min: -100, max: 100, default: 0 },
  { id: "highlights", label: "Highlights", icon: Highlighter, min: -100, max: 100, default: 0 },
  { id: "shadows", label: "Shadows", icon: Moon, min: -100, max: 100, default: 0 },
];

function createColorMatrix(adjustments: {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  highlights: number;
  shadows: number;
  filterAdjustments: Filter["adjustments"];
  filterIntensity: number;
}) {
  const { brightness, contrast, saturation, warmth, highlights, shadows, filterAdjustments, filterIntensity } = adjustments;
  
  const appliedFilter = applyFilterAdjustments(filterAdjustments, filterIntensity);
  
  const totalBrightness = brightness / 100 + (appliedFilter.brightness || 0);
  const totalContrast = 1 + contrast / 100 + (appliedFilter.contrast || 0);
  const totalSaturation = 1 + saturation / 100 + (appliedFilter.saturation || 0);
  const totalWarmth = warmth / 100;
  const totalHighlights = highlights / 100;
  const totalShadows = shadows / 100;
  
  const lumR = 0.2126;
  const lumG = 0.7152;
  const lumB = 0.0722;
  
  const sr = (1 - totalSaturation) * lumR;
  const sg = (1 - totalSaturation) * lumG;
  const sb = (1 - totalSaturation) * lumB;
  
  const contrastTranslate = 0.5 * (1 - totalContrast);
  
  const warmthAdjust = totalWarmth * 0.1;
  const highlightAdjust = totalHighlights * 0.15;
  const shadowAdjust = totalShadows * 0.15;
  
  const rWarmth = 1 + warmthAdjust;
  const bWarmth = 1 - warmthAdjust;
  
  const brightnessOffset = (totalBrightness + highlightAdjust + shadowAdjust + contrastTranslate);
  
  return [
    (sr + totalSaturation) * totalContrast * rWarmth, sr * totalContrast, sr * totalContrast, 0, brightnessOffset,
    sg * totalContrast, (sg + totalSaturation) * totalContrast, sg * totalContrast, 0, brightnessOffset,
    sb * totalContrast, sb * totalContrast, (sb + totalSaturation) * totalContrast * bWarmth, 0, brightnessOffset,
    0, 0, 0, 1, 0,
  ].join(" ");
}

function FilteredImage({ uri, colorMatrix, style }: { 
  uri: string; 
  colorMatrix: string; 
  style: any;
}) {
  const [imageDimensions, setImageDimensions] = useState({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.75 });

  useEffect(() => {
    RNImage.getSize(
      uri, 
      (width: number, height: number) => {
        const aspectRatio = width / height;
        const maxWidth = SCREEN_WIDTH;
        const maxHeight = SCREEN_HEIGHT * 0.75;
        
        let finalWidth = maxWidth;
        let finalHeight = maxWidth / aspectRatio;
        
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = maxHeight * aspectRatio;
        }
        
        setImageDimensions({ width: finalWidth, height: finalHeight });
      },
      (error: any) => {
        console.error("Error getting image size:", error);
      }
    );
  }, [uri]);
  
  return (
    <View style={[style, { alignItems: "center", justifyContent: "center" }]}>
      <Svg width={imageDimensions.width} height={imageDimensions.height}>
        <Defs>
          <SvgFilter id="colorMatrix">
            <FeColorMatrix
              type="matrix"
              values={colorMatrix}
            />
          </SvgFilter>
        </Defs>
        <SvgImage
          x="0"
          y="0"
          width={imageDimensions.width}
          height={imageDimensions.height}
          href={{ uri }}
          preserveAspectRatio="xMidYMid meet"
          filter="url(#colorMatrix)"
        />
      </Svg>
    </View>
  );
}

export default function EditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [mediaType] = useState<MediaType>((params.type as MediaType) || "photo");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(FILTERS[0]);
  const [filterIntensity, setFilterIntensity] = useState(100);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMode, setActiveMode] = useState<EditMode>("filters");
  const [sliderAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    pickImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  useEffect(() => {
    Animated.spring(sliderAnim, {
      toValue: activeMode === "filters" ? 0 : 1,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant access to your photo library to edit images."
        );
        router.back();
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          mediaType === "photo"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
        videoMaxDuration: 30,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      } else {
        router.back();
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
      router.back();
    }
  };



  const saveEdit = async () => {
    if (!imageUri) return;

    try {
      setIsProcessing(true);

      const savedEdits = await AsyncStorage.getItem("lume_saved_edits");
      const edits = savedEdits ? JSON.parse(savedEdits) : [];

      const newEdit = {
        id: Date.now().toString(),
        originalUri: imageUri,
        filter: selectedFilter.id,
        filterIntensity,
        brightness,
        contrast,
        saturation,
        warmth,
        highlights,
        shadows,
        timestamp: Date.now(),
        type: mediaType,
      };

      edits.unshift(newEdit);
      await AsyncStorage.setItem("lume_saved_edits", JSON.stringify(edits));

      Alert.alert(
        "Saved!",
        "Your edit has been saved to your gallery.",
        [
          {
            text: "View Gallery",
            onPress: () => router.replace("/(app)/gallery" as any),
          },
          { text: "OK" },
        ]
      );
    } catch (error) {
      console.error("Error saving edit:", error);
      Alert.alert("Error", "Failed to save edit. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const shareEdit = async () => {
    if (!imageUri) return;

    try {
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert("Error", "Sharing is not available on this device.");
        return;
      }

      await Sharing.shareAsync(imageUri, {
        dialogTitle: "Share your edit",
      });
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert("Error", "Failed to share. Please try again.");
    }
  };

  const getCurrentValue = () => {
    switch (activeMode) {
      case "filters":
        return filterIntensity;
      case "brightness":
        return brightness;
      case "contrast":
        return contrast;
      case "saturation":
        return saturation;
      case "warmth":
        return warmth;
      case "highlights":
        return highlights;
      case "shadows":
        return shadows;
      default:
        return 0;
    }
  };

  const getValueLabel = (value: number, mode: EditMode) => {
    if (mode === "filters") {
      return `${value}%`;
    }
    return value > 0 ? `+${value}` : `${value}`;
  };

  const handleSliderChange = (value: number) => {
    switch (activeMode) {
      case "filters":
        setFilterIntensity(value);
        break;
      case "brightness":
        setBrightness(value);
        break;
      case "contrast":
        setContrast(value);
        break;
      case "saturation":
        setSaturation(value);
        break;
      case "warmth":
        setWarmth(value);
        break;
      case "highlights":
        setHighlights(value);
        break;
      case "shadows":
        setShadows(value);
        break;
    }
  };

  const activeOption = EDIT_OPTIONS.find(opt => opt.id === activeMode);

  const colorMatrix = imageUri ? createColorMatrix({
    brightness,
    contrast,
    saturation,
    warmth,
    highlights,
    shadows,
    filterAdjustments: selectedFilter.adjustments,
    filterIntensity,
  }) : "";

  if (!imageUri) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.accentDark} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          Edit {mediaType === "photo" ? "Photo" : "Video"}
        </Text>
        <View style={styles.headerActions}>
          <Pressable
            onPress={shareEdit}
            style={styles.headerIconButton}
            disabled={isProcessing}
          >
            <Share2 size={20} color={Colors.text} />
          </Pressable>
          <Pressable
            onPress={saveEdit}
            style={[styles.headerIconButton, styles.saveButton]}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Download size={20} color={Colors.white} />
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.previewContainer}>
        <FilteredImage 
          uri={imageUri} 
          colorMatrix={colorMatrix} 
          style={styles.preview}
        />
      </View>

      <View style={[styles.controlPanel, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        {activeMode !== "filters" && activeOption && (
          <Animated.View
            style={[
              styles.sliderContainer,
              {
                opacity: sliderAnim,
                transform: [
                  {
                    translateY: sliderAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>{activeOption.label}</Text>
              <Text style={styles.sliderValue}>
                {getValueLabel(getCurrentValue(), activeMode)}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={activeOption.min}
              maximumValue={activeOption.max}
              value={getCurrentValue()}
              onValueChange={handleSliderChange}
              minimumTrackTintColor={Colors.accentDark}
              maximumTrackTintColor={Colors.accent}
              thumbTintColor={Colors.accentDark}
            />
          </Animated.View>
        )}

        {activeMode === "filters" && (
          <View style={styles.filtersContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              {FILTERS.map((filter) => {
                const isSelected = selectedFilter.id === filter.id;
                return (
                  <Pressable
                    key={filter.id}
                    onPress={() => setSelectedFilter(filter)}
                    style={[
                      styles.filterCard,
                      isSelected && styles.filterCardSelected,
                    ]}
                  >
                    <View style={[styles.filterPreview, isSelected && styles.filterPreviewSelected]}>
                      <Svg width={58} height={58}>
                        <Defs>
                          <SvgFilter id={`filter-${filter.id}`}>
                            <FeColorMatrix
                              type="matrix"
                              values={createColorMatrix({
                                brightness: 0,
                                contrast: 0,
                                saturation: 0,
                                warmth: 0,
                                highlights: 0,
                                shadows: 0,
                                filterAdjustments: filter.adjustments,
                                filterIntensity: 100,
                              })}
                            />
                          </SvgFilter>
                        </Defs>
                        <SvgImage
                          x="0"
                          y="0"
                          width={58}
                          height={58}
                          href={{ uri: imageUri }}
                          preserveAspectRatio="xMidYMid slice"
                          filter={`url(#filter-${filter.id})`}
                        />
                      </Svg>
                    </View>
                    <Text
                      style={[
                        styles.filterLabel,
                        isSelected && styles.filterLabelSelected,
                      ]}
                    >
                      {filter.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            {selectedFilter.id !== "none" && (
              <View style={styles.intensitySlider}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>Intensity</Text>
                  <Text style={styles.sliderValue}>{filterIntensity}%</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  value={filterIntensity}
                  onValueChange={setFilterIntensity}
                  minimumTrackTintColor={Colors.accentDark}
                  maximumTrackTintColor={Colors.accent}
                  thumbTintColor={Colors.accentDark}
                />
              </View>
            )}
          </View>
        )}

        <View style={styles.toolbar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toolbarScroll}
          >
            {EDIT_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isActive = activeMode === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setActiveMode(option.id)}
                  style={[
                    styles.toolButton,
                    isActive && styles.toolButtonActive,
                  ]}
                >
                  <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
                    <Icon
                      size={20}
                      color={isActive ? Colors.white : Colors.text}
                      strokeWidth={2}
                    />
                  </View>
                  <Text
                    style={[
                      styles.toolLabel,
                      isActive && styles.toolLabelActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.text,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600" as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.card,
  },
  saveButton: {
    backgroundColor: Colors.accentDark,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  previewContainer: {
    flex: 3,
    backgroundColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
  },
  controlPanel: {
    flex: 1,
    backgroundColor: Colors.white || "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  sliderContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    letterSpacing: -0.2,
  },
  sliderValue: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: Colors.accentDark,
    letterSpacing: -0.2,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersScroll: {
    gap: 12,
    paddingHorizontal: 4,
  },
  filterCard: {
    alignItems: "center",
    gap: 8,
  },
  filterCardSelected: {},
  filterPreview: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
    backgroundColor: Colors.accent,
  },
  filterPreviewSelected: {
    borderColor: Colors.accentDark,
  },
  filterThumbnail: {
    width: "100%",
    height: "100%",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: Colors.textLight,
    letterSpacing: -0.1,
  },
  filterLabelSelected: {
    fontWeight: "600" as const,
    color: Colors.accentDark,
  },
  intensitySlider: {
    marginTop: 16,
  },
  toolbar: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.accent || "#F3E3DA",
  },
  toolbarScroll: {
    gap: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  toolButton: {
    alignItems: "center",
    gap: 6,
  },
  toolButtonActive: {},
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.card || "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircleActive: {
    backgroundColor: Colors.accentDark || "#D4A5A5",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    transform: [{ scale: 1.05 }],
  },
  toolLabel: {
    fontSize: 11,
    fontWeight: "500" as const,
    color: Colors.textLight,
    letterSpacing: -0.1,
  },
  toolLabelActive: {
    fontWeight: "600" as const,
    color: Colors.text,
  },
});
