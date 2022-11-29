import api from ".";

export type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type Categories = {
  totalCategories: number;
  categoriesList: Category[];
};

const categoryAPI = {
  fetchCategoriesList: async (offset: number, limit: number) => {
    return await api.request({
      url: "/categories",
      params: {
        offset,
        limit,
      },
    });
  },

  //   createCategory: async () => {},

  //   updateCategory: async () => {},
};

export default categoryAPI;
