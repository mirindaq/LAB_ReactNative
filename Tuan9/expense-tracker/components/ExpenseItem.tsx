import { Expense } from "@/types/expense";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { deleteExpense } from "@/database/database";

interface Props {
  item: Expense;
  onDelete?: () => void;
}

export default function ExpenseItem({ item, onDelete }: Props) {
  const router = useRouter();
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

  const isIncome = item.type === "Thu";

  const handlePress = () => {
    router.push({
      pathname: "/EditExpenseScreen",
      params: {
        id: item.id.toString(),
        title: item.title,
        amount: item.amount.toString(),
        type: item.type,
      },
    });
  };

  const handleLongPress = () => {
    Alert.alert(
      "Xóa khoản Thu/Chi",
      `Bạn có chắc muốn xóa "${item.title}"?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await deleteExpense(item.id);
            Alert.alert("✅ Đã xóa thành công!");
            if (onDelete) {
              onDelete();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
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
            <Text style={styles.title}>{item.title}</Text>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  title: {
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
});
