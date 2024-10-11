import { Service } from "../db/service";

export class AIRepository {
  async getServices() {
    return await Service.findAll();
  }

  async changeStatus(id, status) {
    // const service= db.Service.find(()=>{
    //   return service.name===name;
    // })
    // return service.status===status;
    await Service.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }
}
export default new AIRepository();
