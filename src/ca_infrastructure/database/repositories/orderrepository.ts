import { PrismaClientFactory } from './prismaclientfactory';
import { Order } from '../../../ca_domain/entities/order';
import { IOrderRepository } from '../../../ca_domain/interfaces/IOrderRepository';
import { BaseRepository } from './baseprepository';

const prisma = PrismaClientFactory.getMongoDbClient();

export class OrderRepository extends BaseRepository implements IOrderRepository 
{

  async findAll(): Promise<Order[]|null> 
  {
    try
    {
      const orders = await prisma.order.findMany({
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders??null;
  }
  catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async findById(orderId: string): Promise<Order | null> 
  {
    try{
      const order = await prisma.order.findUnique({
        where: {
        orderId,
        },
        include: {
          customer: true,
          orderItems: { include: { product: true,}, },
        },
      });
      return order??null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async create(order: Order): Promise<Order | null> 
  {

    try{
          const newOrder = await prisma.order.create({
          data: {
            orderDate: order.orderDate,
            shippingDate: order.shippingDate as string | Date,
            status: order.status,
            comments: order.comments,
            total: order.total,
            paid: order.paid,
            customer: order.customer ? { connect: { customerCode: order.customer.customerCode } }: undefined,
            orderItems: order.orderItems
            ? {
                create: order.orderItems.map((item) => {
                if (item.product) {
                  return {
                    quantity: item.quantity,
                    status: item.status,
                    product: {
                      connect: { productCode: item.product.productCode },
                    },
                  };
                } else {
                  throw new Error('OrderItem must have a product');
                }
              }),
            }
          : undefined,
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return newOrder??null;
  }
  catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
  
  async update(orderId: string, order: Order): Promise<Order | null> 
  {
    try {
      // Update the order itself
      const updatedOrder = await prisma.order.update({
        where: { orderId },
        data: {
          orderDate: order.orderDate,
          shippingDate: order.shippingDate as string | Date,
          status: order.status,
          comments: order.comments,
          total: order.total,
          paid: order.paid,
          customer: order.customer
            ? { connect: { customerCode: order.customer.customerCode } }
            : undefined,
        },
        include: {
          customer: true,
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update order items (delete existing and create new ones)
      if (order.orderItems && order.orderItems.length > 0) {
        await prisma.orderItem.deleteMany({
          where: { orderId },
        });

        await prisma.orderItem.createMany({
          data: order.orderItems.map((item) => {
            if (item.product) {
              return {
                quantity: item.quantity,
                status: item.status,
                orderId,
                productId: item.product.productCode,
              };
            } else {
              throw new Error('OrderItem must have a product');
            }
          }),
        });
      }

      return updatedOrder;
    } catch (error) {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
  
  async delete(orderId: string): Promise<Order | null> 
  {
    try 
    {
      // Delete related order items first due to references
      await prisma.orderItem.deleteMany({
        where: { orderId },
      });

      // Then, delete the order
      return await prisma.order.delete({
        where: { orderId },
      });
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async findByCustomerId(customerId: string): Promise<Order[] | null> {
    try {
      const orders = await prisma.order.findMany({
        where: { customerId },
        include: {
          customer: true,
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });
      return orders;
    } catch (error) {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
  
}
