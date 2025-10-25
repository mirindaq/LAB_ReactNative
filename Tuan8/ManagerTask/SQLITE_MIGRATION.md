# Migration từ API sang SQLite

## Tổng quan
Ứng dụng đã được cập nhật để sử dụng SQLite thay vì gọi API từ MockAPI. Tất cả dữ liệu tasks sẽ được lưu trữ locally trên thiết bị.

## Thay đổi chính

### 1. Database Service (`services/database.ts`)
- Tạo service quản lý SQLite database
- Cung cấp các methods CRUD cho tasks
- Tự động khởi tạo database và tạo bảng khi cần

### 2. Schema Database
```sql
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  des TEXT NOT NULL,
  status INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

### 3. Các chức năng đã được cập nhật

#### TaskListScreen (`app/(tabs)/index.tsx`)
- `fetchAllTasks()`: Lấy tất cả tasks từ SQLite
- `searchByKeyword()`: Tìm kiếm tasks trong SQLite
- `deleteTask()`: Xóa task từ SQLite

#### TaskFormScreen (`app/task-form.tsx`)
- `createTask()`: Tạo task mới trong SQLite
- `updateTask()`: Cập nhật task trong SQLite

## Lợi ích của SQLite

1. **Offline Support**: Ứng dụng hoạt động hoàn toàn offline
2. **Performance**: Truy cập dữ liệu nhanh hơn so với API
3. **Reliability**: Không phụ thuộc vào kết nối internet
4. **Data Persistence**: Dữ liệu được lưu trữ vĩnh viễn trên thiết bị

## Cách sử dụng

### Khởi tạo Database
Database sẽ tự động được khởi tạo khi ứng dụng chạy lần đầu.

### Thêm Task mới
```typescript
const newTask = await databaseService.createTask("Task description");
```

### Lấy tất cả Tasks
```typescript
const allTasks = await databaseService.getAllTasks();
```

### Tìm kiếm Tasks
```typescript
const searchResults = await databaseService.searchTasks("keyword");
```

### Cập nhật Task
```typescript
const updatedTask = await databaseService.updateTask(taskId, "New description");
```

### Xóa Task
```typescript
await databaseService.deleteTask(taskId);
```

## Cấu trúc Task Object
```typescript
interface Task {
  id: string;           // Unique identifier
  des: string;          // Task description
  status: boolean;      // Task completion status
  createdAt: string;       // Creation timestamp (ISO string)
  updatedAt: string;     // Last update timestamp (ISO string)
}
```

## Lưu ý
- Database file được lưu trữ trong thư mục documents của ứng dụng
- Dữ liệu sẽ được giữ lại giữa các lần khởi động ứng dụng
- Không cần cấu hình thêm, SQLite đã được tích hợp sẵn trong Expo
