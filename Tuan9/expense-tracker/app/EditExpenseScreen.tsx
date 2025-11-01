import { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { updateExpense } from "@/database/database";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditExpenseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse params từ route
  const expenseId = params.id ? parseInt(params.id as string) : 0;
  const initialTitle = (params.title as string) || "";
  const initialAmount = (params.amount as string) || "";
  const initialType = (params.type as string) || "Thu";

  // useRef để clear input sau Save
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  // state lưu dữ liệu
  const [form, setForm] = useState({
    title: initialTitle,
    amount: initialAmount,
    type: initialType,
  });

  // Cập nhật form khi params thay đổi
  useEffect(() => {
    setForm({
      title: initialTitle,
      amount: initialAmount,
      type: initialType,
    });
  }, [initialTitle, initialAmount, initialType]);

  // Hàm cập nhật vào DB
  const handleSave = async () => {
    if (!form.title || !form.amount) {
      Alert.alert("Thiếu dữ liệu", "Nhập đầy đủ tiêu đề và số tiền!");
      return;
    }

    if (expenseId === 0) {
      Alert.alert("Lỗi", "Không tìm thấy ID của khoản chi!");
      return;
    }

    await updateExpense(
      expenseId,
      form.title,
      parseFloat(form.amount),
      form.type
    );

    Alert.alert("✅ Cập nhật thành công!");
    router.back(); // quay về màn hình trước
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sửa khoản Thu/Chi</Text>
      </View>

      <TextInput
        ref={titleRef}
        placeholder="Tên khoản chi"
        placeholderTextColor="#000"
        style={styles.input}
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />

      <TextInput
        ref={amountRef}
        placeholder="Số tiền"
        placeholderTextColor="#000"
        style={styles.input}
        keyboardType="numeric"
        value={form.amount}
        onChangeText={(text) => setForm({ ...form, amount: text })}
      />

      {/* Chọn loại Thu / Chi */}
      <View style={styles.typeContainer}>
        {["Thu", "Chi"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.typeButton,
              form.type === item && styles.typeButtonActive,
            ]}
            onPress={() => setForm({ ...form, type: item })}
          >
            <Text
              style={{
                color: form.type === item ? "#fff" : "#333",
                fontWeight: "600",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>💾 Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "600",
  },
  title: { fontSize: 20, fontWeight: "bold", flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  typeContainer: { flexDirection: "row", marginVertical: 10, gap: 10 },
  typeButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    minWidth: 70,
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: "#4CAF50",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

