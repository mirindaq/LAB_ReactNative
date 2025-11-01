import { useCallback, useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, RefreshControl } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import ExpenseItem from "../components/ExpenseItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { getExpenses } from "@/database/database";
import { Expense } from "@/types/expense";  // ✅ thêm dòng này

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<Expense[]>([]);  // ✅ khai báo kiểu của state
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const items = await getExpenses();
    setData(items);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  useEffect(() => {
    load();
  }, []);

  // Filter data dựa trên searchText
  const filteredData = useMemo(() => {
    if (!searchText.trim()) {
      return data;
    }
    const searchLower = searchText.toLowerCase();
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower)
    );
  }, [data, searchText]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
        <TouchableOpacity
          onPress={() => router.push("/TrashScreen")}
          style={styles.trashButton}
        >
          <Text style={styles.trashIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc loại..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 20, paddingTop: 10 }}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            onDelete={load}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            {searchText.trim() ? "Không tìm thấy kết quả" : "Chưa có dữ liệu"}
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#81C784"
            colors={["#81C784"]}
          />
        }
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
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    flexDirection: "row",
    position: "relative",
  },
  title: { color: "white", fontSize: 22, fontWeight: "bold" },
  trashButton: {
    position: "absolute",
    right: 20,
    padding: 8,
  },
  trashIcon: {
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
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