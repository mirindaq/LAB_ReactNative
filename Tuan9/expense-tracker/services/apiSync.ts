import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "@/types/expense";
import { getExpenses } from "@/database/database";

const API_LINK_KEY = "api_sync_link";

// Lưu API link
export const saveApiLink = async (link: string): Promise<void> => {
  await AsyncStorage.setItem(API_LINK_KEY, link);
};

// Lấy API link
export const getApiLink = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(API_LINK_KEY);
};

// Xóa tất cả data trên API
const clearApiData = async (apiUrl: string): Promise<void> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: Expense[] = await response.json();
    
    // Xóa từng item
    for (const item of data) {
      await fetch(`${apiUrl}/${item.id}`, {
        method: "DELETE",
      });
    }
  } catch (error) {
    // Nếu API trống hoặc lỗi, bỏ qua
    console.log("Clear API data:", error);
  }
};

// Đẩy dữ liệu lên API
const pushDataToApi = async (apiUrl: string, expenses: Expense[]): Promise<void> => {
  for (const expense of expenses) {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: expense.title,
        amount: expense.amount,
        type: expense.type,
        createdAt: expense.createdAt,
      }),
    });
  }
};

// Đồng bộ dữ liệu
export const syncToApi = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const apiLink = await getApiLink();
    
    if (!apiLink || !apiLink.trim()) {
      return {
        success: false,
        message: "Chưa cấu hình API link. Vui lòng cấu hình trong Settings.",
      };
    }

    // Lấy dữ liệu từ database (chỉ lấy chưa xóa)
    const expenses = await getExpenses();

    // Xóa toàn bộ data trên API
    await clearApiData(apiLink);

    // Đẩy dữ liệu mới lên API
    await pushDataToApi(apiLink, expenses);

    return {
      success: true,
      message: `✅ Đồng bộ thành công ${expenses.length} khoản thu/chi!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `❌ Lỗi đồng bộ: ${error.message || "Không thể kết nối API"}`,
    };
  }
};

