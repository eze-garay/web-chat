import CustomRouter from "../custom/custom.routes.js";
import * as user from "../controller/userControllers.js"
import errorHandle from "../services/Dao/Error/middlewares/index.js"

export default class userExtendRouter extends CustomRouter {
  init() {
      
     
      this.post('/login', ["PUBLIC"], user.login);
      
      this.post('/register', ["PUBLIC"], user.register);

      this.get("*", ["PUBLIC"], (req, res) => {
        res.status(404).send("Cannot get that URL!!")
      });

      this.router.use(errorHandle);

  }
}



