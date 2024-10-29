import { Order }                        from "../../ca_domain/entities/order";
import { Customer }                     from "../../ca_domain/entities/customer";
import { IOrderService }                from "../../ca_domain/interfaces/IOrderServices";
import { GetOrderByIdUseCase }          from "../usecases/get_orderbyid_usecase";
import { GetOrderByCustomerIdUseCase }  from "../usecases/get_orderbycustomerid_usecase";
import { CreateOrderUseCase }           from "../usecases/create_order_usecase";
import { UpdateOrderUseCase }           from "../usecases/update_order_usecase";
import { DeleteOrderUseCase }           from "../usecases/delete_order_usecase";
import { GetAllOrdersUsecase }          from "../usecases/get_all_orders_usecase";

export class OrderService implements IOrderService
{
    private getOrderByIdUseCase:            GetOrderByIdUseCase;
    private getOrdersByCustomerIdUseCase:   GetOrderByCustomerIdUseCase;
    private createOrderUseCase:             CreateOrderUseCase;
    private updateOrderUseCase:             UpdateOrderUseCase;
    private deleteOrderUseCase:             DeleteOrderUseCase;
    private getAllOrdersUseCase:            GetAllOrdersUsecase;

    constructor(
    ) {
        this.getOrderByIdUseCase =          new GetOrderByIdUseCase();
        this.getOrdersByCustomerIdUseCase = new GetOrderByCustomerIdUseCase();
        this.createOrderUseCase =           new CreateOrderUseCase();
        this.updateOrderUseCase =           new UpdateOrderUseCase();
        this.deleteOrderUseCase =           new DeleteOrderUseCase();
        this.getAllOrdersUseCase =          new GetAllOrdersUsecase();
    }

    async getOrderById(id: string): Promise<Order|null> {
        return await this.getOrderByIdUseCase.execute(id);
    }

    async getOrdersByCustomerId(customerId: string): Promise<Customer|null> {
        return await this.getOrdersByCustomerIdUseCase.execute(customerId);
    }

    async getAllOrders(): Promise<Order[]|null> {
        return await this.getAllOrdersUseCase.execute();
    }

    async createOrder(order: Order): Promise<Order|null> {
        return await this.createOrderUseCase.execute(order);
    }

    async updateOrder(id: string, order: Order): Promise<Order|null> {
        return await this.updateOrderUseCase.execute(id, order);
    }

    async deleteOrder(id: string): Promise<Order|null> {
        return await this.deleteOrderUseCase.execute(id);
    }
}
