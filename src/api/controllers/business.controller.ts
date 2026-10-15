import {
  createProductDto,
  deleteProductDto,
  getCatalogDto,
  getCollectionsDto,
  updateProductDto,
} from '@api/dto/business.dto';
import { InstanceDto } from '@api/dto/instance.dto';
import { WAMonitoringService } from '@api/services/monitor.service';

export class BusinessController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  public async fetchCatalog({ instanceName }: InstanceDto, data: getCatalogDto) {
    return await this.waMonitor.waInstances[instanceName].fetchCatalog(instanceName, data);
  }

  public async fetchCollections({ instanceName }: InstanceDto, data: getCollectionsDto) {
    return await this.waMonitor.waInstances[instanceName].fetchCollections(instanceName, data);
  }

  public async createProduct({ instanceName }: InstanceDto, data: createProductDto) {
    return await this.waMonitor.waInstances[instanceName].createProduct(data);
  }

  public async updateProduct({ instanceName }: InstanceDto, data: updateProductDto) {
    return await this.waMonitor.waInstances[instanceName].updateProduct(data);
  }

  public async deleteProduct({ instanceName }: InstanceDto, data: deleteProductDto) {
    return await this.waMonitor.waInstances[instanceName].deleteProduct(data);
  }
}
