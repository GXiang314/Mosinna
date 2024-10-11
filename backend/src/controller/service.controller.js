import serviceService from "../service/service.service";
import { apiFormatter } from "../utils/api-formatter";

export class ServiceController {
  async registerService(req, res) {
    res.json(apiFormatter(await serviceService.registerService(req.body)));
  }

  async getServices(req, res) {
    res.json(apiFormatter(await serviceService.getServices()));
  }
}

export default new ServiceController();
