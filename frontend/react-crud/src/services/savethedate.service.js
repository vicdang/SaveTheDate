import http from "../http-common";

class SaveTheDateDataService {
  getAll() {
    return http.get("/savethedates");
  }

  get(id) {
    return http.get(`/savethedates/${id}`);
  }

  create(data) {
    return http.post("/savethedates", data);
  }

  update(id, data) {
    return http.put(`/savethedates/${id}`, data);
  }

  delete(id) {
    return http.delete(`/savethedates/${id}`);
  }

  deleteAll() {
    return http.delete(`/savethedates`);
  }

  findByTitle(guest) {
    return http.get(`/savethedates?guest=${guest}`);
  }
}

export default new SaveTheDateDataService();