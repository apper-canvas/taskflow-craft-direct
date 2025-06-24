import discountsData from '../mockData/discounts.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let discounts = [...discountsData];

export const discountService = {
  async getAll() {
    await delay(300);
    return [...discounts];
  },

  async getById(id) {
    await delay(200);
    const discount = discounts.find(d => d.Id === parseInt(id, 10));
    if (!discount) {
      throw new Error('Discount not found');
    }
    return { ...discount };
  },

  async getByCategory(category) {
    await delay(300);
    return discounts
      .filter(d => d.category.toLowerCase() === category.toLowerCase())
      .map(d => ({ ...d }));
  },

  async getActive() {
    await delay(300);
    const now = new Date();
    return discounts
      .filter(d => new Date(d.expiryDate) > now)
      .map(d => ({ ...d }));
  }
};

export default discountService;