import { toast } from 'react-toastify';

export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "due_date" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "created_at" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Map database fields to UI expected format
      const mappedData = (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title,
        description: item.description,
        dueDate: item.due_date,
        priority: item.priority,
        status: item.status,
        createdAt: item.created_at,
        tags: item.Tags
      }));

      return mappedData;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "due_date" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "created_at" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById('task', parseInt(id, 10), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      // Map database fields to UI expected format
      const item = response.data;
      return {
        Id: item.Id,
        title: item.title,
        description: item.description,
        dueDate: item.due_date,
        priority: item.priority,
        status: item.status,
        createdAt: item.created_at,
        tags: item.Tags
      };
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      toast.error("Failed to load task");
      return null;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map form data to database fields (only Updateable fields)
      const record = {
        Name: taskData.title, // Map title to Name field
        title: taskData.title,
        description: taskData.description || "",
        due_date: taskData.dueDate,
        priority: taskData.priority,
        status: "active",
        created_at: new Date().toISOString(),
        Tags: taskData.tags || ""
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.createRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success('Task created successfully!');
          const item = successfulRecords[0].data;
          return {
            Id: item.Id,
            title: item.title,
            description: item.description,
            dueDate: item.due_date,
            priority: item.priority,
            status: item.status,
            createdAt: item.created_at,
            tags: item.Tags
          };
        }
      }
      
      throw new Error('Failed to create task');
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
      throw error;
    }
  },

  async update(id, taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map form data to database fields (only Updateable fields)
      const record = {
        Id: parseInt(id, 10),
        Name: taskData.title, // Map title to Name field
        title: taskData.title,
        description: taskData.description || "",
        due_date: taskData.dueDate,
        priority: taskData.priority,
        status: taskData.status || "active",
        Tags: taskData.tags || ""
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success('Task updated successfully!');
          const item = successfulUpdates[0].data;
          return {
            Id: item.Id,
            title: item.title,
            description: item.description,
            dueDate: item.due_date,
            priority: item.priority,
            status: item.status,
            createdAt: item.created_at,
            tags: item.Tags
          };
        }
      }
      
      throw new Error('Failed to update task');
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id, 10)]
      };

      const response = await apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error('Failed to delete task');
        }
        
        toast.success('Task deleted successfully!');
        return true;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      throw error;
    }
  },

  async getByStatus(status) {
    try {
      const allTasks = await this.getAll();
      return allTasks.filter(t => t.status === status);
    } catch (error) {
      console.error("Error fetching tasks by status:", error);
      return [];
    }
  },

  async toggleStatus(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error('Task not found');
      }

      // Toggle the status
      const newStatus = currentTask.status === 'active' ? 'completed' : 'active';
      
      // Update with new status
      return await this.update(id, {
        ...currentTask,
        status: newStatus
      });
    } catch (error) {
      console.error("Error toggling task status:", error);
      toast.error("Failed to update task status");
      throw error;
    }
  }
};

export default taskService;