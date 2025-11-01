import { View, Text, StyleSheet } from "react-native";

interface ExpenseItemProps {
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
}

export default function ExpenseItem({ title, amount, createdAt, type }: ExpenseItemProps) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{createdAt}</Text>
      </View>

      <Text style={[styles.amount, type === "Thu" ? styles.income : styles.expense]}>
        {type === "Thu" ? "+" : "-"} {amount.toLocaleString()} ₫
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
});
