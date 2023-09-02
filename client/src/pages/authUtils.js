export const setAccessToken = (accessToken) => {
  // Simpan access token di dalam penyimpanan lokal (localStorage) atau di Redux state sesuai dengan preferensi Anda.
  localStorage.setItem("access_token", accessToken);
};

export const getAccessToken = () => {
  // Ambil access token dari penyimpanan lokal (localStorage) atau dari Redux state sesuai dengan preferensi Anda.
  return localStorage.getItem("access_token");
};
