import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="editor" />
      <Stack.Screen name="gallery" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
