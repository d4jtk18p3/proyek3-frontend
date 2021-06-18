import http from "../datasource/http-common"

class AkunServices {
  async getAll () {
    return await http.get("/user/")
  }

  async get (id) {
    return await http.get("user?key=" + id)
  }

  async getbyRole (role) {
    return await http.get("user?role=" + role)
  }

  async delete (id) {
    return await http.delete("user/" + id)
  }

  async update (id, email, status, name) {
    return await http.put("user/update-account", {
      username: id,
      newEmail: email,
      newStatus: status,
      newName: name
    })
  }
}

export default new AkunServices()
