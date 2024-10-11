import serviceRepository from "../repository/service.repository";

export class ServiceService {
  async registerService(payload) {
    await serviceRepository.registerService(payload);
  }

  async getServices() {
    return await serviceRepository.getServices();
  }
}

export default new ServiceService();
