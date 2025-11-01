import { useCallback, useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getExpenses } from "@/database/database";
import { Expense } from "@/types/expense";

interface MonthlyStats {
  month: string;
  thu: number;
  chi: number;
}

export default function StatisticsScreen() {
  const router = useRouter();
  const [data, setData] = useState<Expense[]>([]);

  const load = async () => {
    const items = await getExpenses();
    setData(items);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  // Tính toán thống kê theo tháng
  const monthlyStats = useMemo(() => {
    const statsMap = new Map<string, { thu: number; chi: number }>();

    data.forEach((expense) => {
      const date = new Date(expense.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleDateString("vi-VN", {
        month: "short",
        year: "numeric",
      });

      if (!statsMap.has(monthKey)) {
        statsMap.set(monthKey, { thu: 0, chi: 0 });
      }

      const stats = statsMap.get(monthKey)!;
      if (expense.type === "Thu") {
        stats.thu += expense.amount;
      } else {
        stats.chi += expense.amount;
      }
    });

    // Chuyển đổi thành array và sắp xếp theo tháng
    const stats: MonthlyStats[] = Array.from(statsMap.entries())
      .map(([monthKey, stats]) => {
        const [year, month] = monthKey.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return {
          monthKey,
          month: date.toLocaleDateString("vi-VN", {
            month: "short",
            year: "numeric",
          }),
          thu: stats.thu,
          chi: stats.chi,
        };
      })
      .sort((a, b) => {
        // Sort by monthKey descending (newest first)
        return b.monthKey.localeCompare(a.monthKey);
      })
      .slice(0, 6) // Chỉ hiển thị 6 tháng gần nhất
      .map((item) => ({
        month: item.month,
        thu: item.thu,
        chi: item.chi,
      }));

    return stats;
  }, [data]);

  // Tính tổng
  const totalStats = useMemo(() => {
    const total = monthlyStats.reduce(
      (acc, stat) => {
        acc.thu += stat.thu;
        acc.chi += stat.chi;
        return acc;
      },
      { thu: 0, chi: 0 }
    );
    return total;
  }, [monthlyStats]);

  // Tìm giá trị max để scale biểu đồ
  const maxValue = useMemo(() => {
    const max = Math.max(
      ...monthlyStats.map((s) => Math.max(s.thu, s.chi)),
      1
    );
    return max;
  }, [monthlyStats]);

  // Format số tiền
  const formatAmount = (amount: number) => {
    return amount.toLocaleString("vi-VN");
  };

  // Tính chiều cao cột (tối đa 200px)
  const getBarHeight = (value: number) => {
    if (maxValue === 0) return 0;
    return (value / maxValue) * 200;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thống Kê</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tổng quan */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Tổng Thu</Text>
            <Text style={[styles.summaryValue, styles.incomeColor]}>
              {formatAmount(totalStats.thu)} đ
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Tổng Chi</Text>
            <Text style={[styles.summaryValue, styles.expenseColor]}>
              {formatAmount(totalStats.chi)} đ
            </Text>
          </View>
        </View>

        {/* Biểu đồ */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ Thu/Chi theo tháng</Text>
          
          {monthlyStats.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có dữ liệu</Text>
          ) : (
            <View style={styles.chart}>
              {/* Bars */}
              <View style={styles.barsContainer}>
                {monthlyStats.map((stat, index) => (
                  <View key={index} style={styles.barGroup}>
                    <View style={styles.barsWrapper}>
                      {/* Bar Thu */}
                      <View style={styles.barColumn}>
                        <View
                          style={[
                            styles.bar,
                            styles.barThu,
                            { height: getBarHeight(stat.thu) },
                          ]}
                        >
                          {stat.thu > 0 && (
                            <Text style={styles.barValue}>
                              {formatAmount(stat.thu)}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.barLabel}>Thu</Text>
                      </View>

                      {/* Bar Chi */}
                      <View style={styles.barColumn}>
                        <View
                          style={[
                            styles.bar,
                            styles.barChi,
                            { height: getBarHeight(stat.chi) },
                          ]}
                        >
                          {stat.chi > 0 && (
                            <Text style={styles.barValue}>
                              {formatAmount(stat.chi)}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.barLabel}>Chi</Text>
                      </View>
                    </View>
                    <Text style={styles.monthLabel}>{stat.month}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  incomeColor: {
    color: "#2E7D32",
  },
  expenseColor: {
    color: "#C62828",
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 20,
    textAlign: "center",
  },
  chart: {
    minHeight: 300,
  },
  barsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 20,
  },
  barGroup: {
    alignItems: "center",
    flex: 1,
  },
  barsWrapper: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  barColumn: {
    alignItems: "center",
    width: 50,
  },
  bar: {
    width: 40,
    borderRadius: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 4,
    minHeight: 20,
  },
  barThu: {
    backgroundColor: "#4CAF50",
  },
  barChi: {
    backgroundColor: "#F44336",
  },
  barValue: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
  barLabel: {
    fontSize: 11,
    color: "#757575",
    marginTop: 4,
  },
  monthLabel: {
    fontSize: 12,
    color: "#212121",
    fontWeight: "600",
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#757575",
  },
});

