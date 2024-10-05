import axios from "axios";
import AIRepository from "../repository/AIRepository";
import { ServiceStatusEnum } from "./ServiceStatusEnum";

export class AIService {
  aiRepository;

  constructor(aiRepository) {
    this.aiRepository = aiRepository;
  }

  async heartbeat() {
    const services = await this.aiRepository.getServices();

    for await (const service of services) {
      axios
        .get(service.host + `/api/health`)
        .then(() => {
          if (service.status === ServiceStatusEnum.可用) return;
          this.aiRepository.changeStatus(service.name, ServiceStatusEnum.可用);
        })
        .catch(() => {
          if (service.status === ServiceStatusEnum.不可用) return;
          this.aiRepository.changeStatus(service.name, ServiceStatusEnum.不可用);
        });
    }
  }
}

export default AIService;
