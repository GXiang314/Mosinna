import { jest, describe, it, afterAll, beforeAll } from "@jest/globals";
import { ServiceStatusEnum } from "../services/ServiceStatusEnum";
import { AIService } from "../services/AIService";
import { Service } from "../db/service";
import AIRepository from "../repository/AIRepository";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { sequelize } from "../db";
import { Op } from "sequelize";

describe("驗收測試 - 心跳檢測", () => {
  beforeAll((done) => {
    // await sequelize
    //   .validate()
    //   .then(async () => {
    //     console.log("database was connected.");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
  it(`
        Given (前提)
            服務註冊表中有 2 個服務
            分別為 
            AI 音訊檢測服務: 
            1. 服務端點: http://192.168.1.123/api
            2. 目前狀態: 不可用
            文字詐騙檢測服務:
            1. 服務端點: http://192.168.1.124/api
            2. 目前狀態: 不可用

        When (做)
            服務心跳檢測
            AI 音訊檢測服務可用
            文字詐騙檢測不可用

        Then (後置條件、預期結果)
            服務註冊表會變成怎樣？
            AI 音訊檢測服務
            目前狀態: 可用
            文字詐騙檢測服務
            目前狀態: 不可用
    `, async () => {
    //Given
    const services = [
      {
        name: "AI 音訊檢測服務:",
        host: "http://192.168.1.123",
        status: ServiceStatusEnum.不可用,
      },
      {
        name: "文字詐騙檢測服務:",
        host: "http://192.168.1.124",
        status: ServiceStatusEnum.不可用,
      },
    ];
    await Service.bulkCreate(services);
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`${services[0].host}/api/healthy`).reply(200);
    mockAxios.onGet(`${services[1].host}/api/healthy`).reply(404);

    //When
    const service = new AIService(AIRepository);
    await service.heartbeat();
    // await status changed
    await new Promise((resolve) => setTimeout(resolve, 100));

    //Then
    const afterService = await AIRepository.getServices();
    const 音訊檢測服務 = afterService.find(
      (item) => item.dataValues.name == services[0].name
    );
    const 文字詐騙檢測服務 = afterService.find(
      (item) => item.dataValues.name == services[1].name
    );
    expect(音訊檢測服務.status).toBe(ServiceStatusEnum.可用);
    expect(文字詐騙檢測服務.status).toBe(ServiceStatusEnum.不可用);
  });
});
