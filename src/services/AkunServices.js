import http from "../datasource/http-common";

class AkunServices {
    getAll(){
        return http.get("/user/");
    }
}

export default new AkunServices();