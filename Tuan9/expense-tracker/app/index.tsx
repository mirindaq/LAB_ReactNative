import { useCallback, useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, RefreshControl, Alert } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import ExpenseItem from "../components/ExpenseItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { getExpenses } from "@/database/database";
import { Expense } from "@/types/expense";
import { syncToApi } from "@/services/apiSync";

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<Expense[]>([]);  // ✅ khai báo kiểu của state
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [syncing, setSyncing] = useState(false);

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

  const handleSync = async () => {
    setSyncing(true);
    const result = await syncToApi();
    setSyncing(false);
    Alert.alert(result.success ? "Thành công" : "Lỗi", result.message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/SyncSettingsScreen")}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>EXPENSE TRACKER</Text>
        </View>
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

      {/* Nút đồng bộ */}
      <View style={styles.syncContainer}>
        <TouchableOpacity
          onPress={handleSync}
          style={[styles.syncButton, syncing && styles.syncButtonDisabled]}
          disabled={syncing}
        >
          <Text style={styles.syncIcon}>{syncing ? "⏳" : "🔄"}</Text>
          <Text style={styles.syncText}>{syncing ? "Đang đồng bộ..." : "Đồng bộ"}</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },
  settingsButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  trashButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
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
  syncContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  syncButtonDisabled: {
    backgroundColor: "#BBDEFB",
    opacity: 0.7,
  },
  syncIcon: {
    fontSize: 18,
  },
  syncText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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