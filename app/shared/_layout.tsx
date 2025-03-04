import { Stack } from 'expo-router';

export default function SharedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="budget-share" />
      <Stack.Screen name="expense-split" />
    </Stack>
  );
}
