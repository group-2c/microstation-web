import { createStore } from "vuex"
import auth from "./modules/auth"
import circuit from "./modules/circuit"

export default createStore({
  modules: {
    auth,
    circuit,
  }
})
