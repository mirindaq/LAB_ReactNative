import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import ExpenseItem from "../components/ExpenseItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { getExpenses } from "@/database/database";
import { Expense } from "@/types/expense";  // ✅ thêm dòng này

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<Expense[]>([]);  // ✅ khai báo kiểu của state

  const load = async () => {
    const items = await getExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  useEffect(() => {
    load();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 30 }}>Chưa có dữ liệu</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/AddExpenseScreen")}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addText: { fontSize: 32, color: "white", marginTop: -3 },
});