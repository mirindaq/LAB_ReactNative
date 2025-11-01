import { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeletedExpenses } from "@/database/database";
import { Expense } from "@/types/expense";

export default function TrashScreen() {
  const router = useRouter();
  const [data, setData] = useState<Expense[]>([]);

  const load = async () => {
    const items = await getDeletedExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

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

      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Thùng rác trống</Text>
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
});

