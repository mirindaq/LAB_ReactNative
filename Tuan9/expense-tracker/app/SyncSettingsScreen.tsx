import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveApiLink, getApiLink } from "@/services/apiSync";

export default function SyncSettingsScreen() {
  const router = useRouter();
  const [apiLink, setApiLink] = useState("");

  useEffect(() => {
    loadApiLink();
  }, []);

  const loadApiLink = async () => {
    const link = await getApiLink();
    if (link) {
      setApiLink(link);
    }
  };

  const handleSave = async () => {
    if (!apiLink.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập API link!");
      return;
    }

    // Validate URL
    try {
      new URL(apiLink);
    } catch {
      Alert.alert("Lỗi", "API link không hợp lệ!");
      return;
    }

    await saveApiLink(apiLink.trim());
    Alert.alert("✅ Đã lưu!", "API link đã được lưu thành công.");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cấu hình API</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>API Link (MockAPI.io)</Text>
        <Text style={styles.hint}>
          Nhập link API từ MockAPI.io (ví dụ: https://xxxxxxxx.mockapi.io/api/expenses)
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="https://xxxxxxxx.mockapi.io/api/expenses"
          placeholderTextColor="#999"
          value={apiLink}
          onChangeText={setApiLink}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📋 Cấu trúc table cần tạo trên MockAPI:</Text>
          <Text style={styles.infoText}>• title (Text)</Text>
          <Text style={styles.infoText}>• amount (Number)</Text>
          <Text style={styles.infoText}>• type (Text)</Text>
          <Text style={styles.infoText}>• createdAt (Text)</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Lưu API Link</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    padding: 8,
    minWidth: 70,
  },
  backText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976D2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#424242",
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

