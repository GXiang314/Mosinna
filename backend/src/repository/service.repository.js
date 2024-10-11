import db from "../db";
import { ServiceStatusEnum } from "../enum/service-status.enum";

export class ServiceRepository {
  async registerService(payload) {
    return await db.Service.create({
      name: payload.name,
      host: payload.host,
      status: ServiceStatusEnum.不可用,
    });
  }

  async getServices() {
    return await db.Service.findAll();
  }
}

export default new ServiceRepository();
