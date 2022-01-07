import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1",
//   headers: {"Authorization": "Basic ZmVpcmFBUEk6OThMUFNZRnVnZHN0dDY3NTR2Y2hic25tbGtqdXk3NjQ="}

});

export default api;