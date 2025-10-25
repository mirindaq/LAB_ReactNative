import * as SQLite from 'expo-sqlite';

export interface Task {
  id: string;
  des: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('tasks.db');
      
      // Tạo bảng tasks nếu chưa tồn tại
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          des TEXT NOT NULL,
          status INTEGER NOT NULL DEFAULT 0,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );
      `);
      
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async getAllTasks(): Promise<Task[]> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const result = await this.db!.getAllAsync('SELECT * FROM tasks ORDER BY createdAt DESC');
      return result as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const result = await this.db!.getFirstAsync('SELECT * FROM tasks WHERE id = ?', id);
      return result as Task | null;
    } catch (error) {
      console.error('Error fetching task by id:', error);
      throw error;
    }
  }

  async searchTasks(keyword: string): Promise<Task[]> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const result = await this.db!.getAllAsync(
        'SELECT * FROM tasks WHERE des LIKE ? ORDER BY createdAt DESC',
        `%${keyword}%`
      );
      return result as Task[];
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  }

  async createTask(des: string): Promise<Task> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const id = Date.now().toString();
      const now = new Date().toISOString();
      
      const task: Task = {
        id,
        des,
        status: false,
        createdAt: now,
        updatedAt: now,
      };

      await this.db!.runAsync(
        'INSERT INTO tasks (id, des, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        task.id,
        task.des,
        task.status ? 1 : 0,
        task.createdAt,
        task.updatedAt
      );

      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id: string, des: string, status?: boolean): Promise<Task | null> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const now = new Date().toISOString();
      
      if (status !== undefined) {
        // Cập nhật cả des và status
        await this.db!.runAsync(
          'UPDATE tasks SET des = ?, status = ?, updatedAt = ? WHERE id = ?',
          des,
          status ? 1 : 0,
          now,
          id
        );
      } else {
        // Chỉ cập nhật des
        await this.db!.runAsync(
          'UPDATE tasks SET des = ?, updatedAt = ? WHERE id = ?',
          des,
          now,
          id
        );
      }

      return await this.getTaskById(id);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      await this.db!.runAsync('DELETE FROM tasks WHERE id = ?', id);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async toggleTaskStatus(id: string): Promise<Task | null> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const task = await this.getTaskById(id);
      if (!task) {
        return null;
      }

      const newStatus = !task.status;
      const now = new Date().toISOString();

      await this.db!.runAsync(
        'UPDATE tasks SET status = ?, updatedAt = ? WHERE id = ?',
        newStatus ? 1 : 0,
        now,
        id
      );

      return await this.getTaskById(id);
    } catch (error) {
      console.error('Error toggling task status:', error);
      throw error;
    }
  }

  async clearAllTasks(): Promise<void> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      await this.db!.runAsync('DELETE FROM tasks');
    } catch (error) {
      console.error('Error clearing all tasks:', error);
      throw error;
    }
  }

  async getTasksCount(): Promise<number> {
    if (!this.db) {
      await this.initDatabase();
    }

    try {
      const result = await this.db!.getFirstAsync('SELECT COUNT(*) as count FROM tasks');
      return (result as any)?.count || 0;
    } catch (error) {
      console.error('Error getting tasks count:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
