import { toast } from 'react-toastify';

export const discountService = {
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
          { field: { Name: "code" } },
          { field: { Name: "discount" } },
          { field: { Name: "expiry_date" } },
          { field: { Name: "category" } },
          { field: { Name: "url" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          {
            fieldName: "expiry_date",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('app_discount', params);
      
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
        code: item.code,
        discount: item.discount,
        expiryDate: item.expiry_date,
        category: item.category,
        url: item.url,
        tags: item.Tags
      }));

      return mappedData;
    } catch (error) {
      console.error("Error fetching discounts:", error);
      toast.error("Failed to load discounts");
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
          { field: { Name: "code" } },
          { field: { Name: "discount" } },
          { field: { Name: "expiry_date" } },
          { field: { Name: "category" } },
          { field: { Name: "url" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById('app_discount', parseInt(id, 10), params);
      
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
        code: item.code,
        discount: item.discount,
        expiryDate: item.expiry_date,
        category: item.category,
        url: item.url,
        tags: item.Tags
      };
    } catch (error) {
      console.error(`Error fetching discount with ID ${id}:`, error);
      toast.error("Failed to load discount");
      return null;
    }
  },

  async getByCategory(category) {
    try {
      const allDiscounts = await this.getAll();
      return allDiscounts.filter(d => d.category.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error("Error fetching discounts by category:", error);
      return [];
    }
  },

  async getActive() {
    try {
      const allDiscounts = await this.getAll();
      const now = new Date();
      return allDiscounts.filter(d => new Date(d.expiryDate) > now);
    } catch (error) {
      console.error("Error fetching active discounts:", error);
      return [];
    }
  }
};

export default discountService;