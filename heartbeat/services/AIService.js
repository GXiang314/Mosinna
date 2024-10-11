import axios from "axios";
import { ServiceStatusEnum } from "./ServiceStatusEnum";

export class AIService {
  /**
   * @type {import ('../repository/AIRepository').default"}
   */
  aiRepository;
  HeartbeatId;

  constructor(aiRepository) {
    this.aiRepository = aiRepository;
  }

  async heartbeat() {
    const services = await this.aiRepository.getServices();

    // await Promise.all(services.map)

    for await (const service of services) {
      console.log("heartbeat...");
      console.log(`service name: ${service.name}`);
      console.log(`service host: ${service.host}`);
      console.log("\n");
      axios
        .get(service.host + `/api/healthy`)
        .then(() => {
          console.log(`ping ${service.name} successfully!`);
          if (service.status === ServiceStatusEnum.可用) return;
          this.aiRepository.changeStatus(service.id, ServiceStatusEnum.可用);
        })
        .catch(() => {
          console.log(`ping ${service.name} error!`);
          if (service.status === ServiceStatusEnum.不可用) return;
          this.aiRepository.changeStatus(service.id, ServiceStatusEnum.不可用);
        });
    }
  }

  startHeartbeat(milliseconds) {
    if (this.HeartbeatId) return;
    this.HeartbeatId = setInterval(async () => {
      await this.heartbeat();
    }, Number(milliseconds));
  }
}
