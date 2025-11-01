import { useCallback, useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, RefreshControl } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeletedExpenses } from "@/database/database";
import { Expense } from "@/types/expense";

export default function TrashScreen() {
  const router = useRouter();
  const [data, setData] = useState<Expense[]>([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const items = await getDeletedExpenses();
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

  // Format số tiền với dấu phẩy
  const formatAmount = (amount: number) => {
    return amount.toLocaleString("vi-VN");
  };

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderItem = ({ item }: { item: Expense }) => {
    const isIncome = item.type === "Thu";

    return (
      <View style={styles.item}>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.typeBadge,
                isIncome ? styles.typeBadgeIncome : styles.typeBadgeExpense,
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  isIncome ? styles.typeTextIncome : styles.typeTextExpense,
                ]}
              >
                {item.type}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
            </View>
          </View>
          <Text
            style={[
              styles.amount,
              isIncome ? styles.income : styles.expense,
            ]}
          >
            {isIncome ? "+" : "-"} {formatAmount(item.amount)} đ
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thùng Rác</Text>
        <View style={styles.backButton} />
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
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchText.trim() ? "Không tìm thấy kết quả" : "Thùng rác trống"}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#757575",
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },
  backButton: {
    padding: 8,
    minWidth: 70,
  },
  backText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    opacity: 0.7, // Làm mờ để phân biệt với item chưa xóa
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 50,
    alignItems: "center",
  },
  typeBadgeIncome: {
    backgroundColor: "#E8F5E9",
  },
  typeBadgeExpense: {
    backgroundColor: "#FFEBEE",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  typeTextIncome: {
    color: "#2E7D32",
  },
  typeTextExpense: {
    color: "#C62828",
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#757575",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  income: {
    color: "#2E7D32",
  },
  expense: {
    color: "#C62828",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#757575",
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
});

