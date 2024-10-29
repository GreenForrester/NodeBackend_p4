import { Order } from '../../ca_domain/entities/order';
import { OrderRepository } from '../../ca_infrastructure/database/repositories/orderrepository';
import { IOrderRepository } from '../../ca_domain/interfaces/IOrderRepository'

export class GetAllOrdersUsecase {
    private orderRepository: IOrderRepository;  
    constructor() {this.orderRepository = new OrderRepository();}

    async execute(): Promise<Order[]|null> {
        return await this.orderRepository.findAll();
    }
}