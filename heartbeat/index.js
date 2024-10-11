import AIService from "./services/AIService"
import AIRepository from "./repository/AIRepository"

const repository = new AIRepository();
const aiService = new AIService(repository);

aiService.startHeartbeat(process.env.HEARTBEAT_INTERVAL || 20000);

console.log('Heartbeat service has been started.')

