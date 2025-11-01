import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.placeholderText}>📌 Danh sách thu/chi sẽ hiển thị tại đây</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // nền tổng thể nhẹ nhàng
  },
  header: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // đổ bóng Android
    shadowColor: "#000", // đổ bóng iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
  },
});
