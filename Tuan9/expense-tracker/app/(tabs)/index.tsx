import ExpenseItem from "@/components/ExpenseItem";
import {  View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyData = [
  { id: "1", title: "Ăn sáng", amount: 30000, createdAt: "2025-11-01", type: "Chi" },
  { id: "2", title: "Lương", amount: 8000000, createdAt: "2025-11-01", type: "Thu" },
  { id: "3", title: "Mua sách", amount: 120000, createdAt: "2025-10-30", type: "Chi" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>

      {/* List Expense */}
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            createdAt={item.createdAt}
            type={item.type as "Thu" | "Chi"}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.placeholderText}>📌 Chưa có dữ liệu thu/chi</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingTop: 30,
  },
});
