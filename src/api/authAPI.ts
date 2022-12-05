import api from ".";

const authAPI = {
  signIn: (email: string, password: string) => (
   api.request({
      url: "/auth",
      method: "POST",
      data: JSON.stringify({ email, password }),
    })
  ),
  signUp: (email: string, password: string, name: string) =>
     api.request({
      url: "/users",
      method: "POST",
      data: JSON.stringify({ email, password, name }),
    }),
    fetchUserInfo: () => api.request({
      url: "/users/me",
      method: "GET",
    })

};

export default authAPI;
