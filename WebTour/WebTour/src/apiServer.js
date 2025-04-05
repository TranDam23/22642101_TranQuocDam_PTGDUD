class ApiService {
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Lỗi khi fetch ${url}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getTours() {
    return await this.fetchData("http://localhost:3002/get-tours");
  }

  static async getDestinations() {
    return await this.fetchData("http://localhost:3002/get-destinations");
  }

  static async getTourImages() {
    return await this.fetchData("http://localhost:3002/get-tour-images");
  }
}

export default ApiService;
