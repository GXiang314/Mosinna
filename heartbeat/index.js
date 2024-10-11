import { AIService } from "./services/AIService";
import AIRepository from "./repository/AIRepository";
import { sequelize } from "./db";

async () =>
  await sequelize
    .validate()
    .then(() => {
      console.log("database was connected.");
    })
    .catch((err) => {
      console.log(err);
    });

const aiService = new AIService(AIRepository);

aiService.startHeartbeat(process.env.HEARTBEAT_INTERVAL || 20000);

console.log("Heartbeat service has been started.");
