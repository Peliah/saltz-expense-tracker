import { Stack } from 'expo-router';

export default function BudgetsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="categories" />
      <Stack.Screen name="new-category" />
    </Stack>
  );
}
