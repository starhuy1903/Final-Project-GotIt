import api from ".";

const authAPI = {
  signIn: async (email: string, password: string) => {
    const res = await api.request({
      url: "/auth",
      method: "POST",
      data: JSON.stringify({ email, password }),
    });
    return res.data; // token
  },
  signUp: async (email: string, password: string, name: string) => {
    await api.request({
      url: "/users",
      method: "POST",
      data: JSON.stringify({ email, password, name }),
    });
  },
};

export default authAPI;
