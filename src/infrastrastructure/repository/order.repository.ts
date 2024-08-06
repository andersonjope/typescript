import { or } from "sequelize";
import OrderItem from "../../domain/entity/ordem.item";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order.item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    await Promise.all(
      entity.items.map((item) =>
        OrderItemModel.upsert({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
          orderId: entity.id,
        })
      )
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    let orderItem: OrderItem[] = [];

    orderModel.items.map((item) => {
      orderItem.push(
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
      );
    });

    return new Order(orderModel.id, orderModel.customerId, orderItem);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = orderModels.map((orderModel) => {
      let orderItem: OrderItem[] = [];

      orderModel.items.map((item) => {
        orderItem.push(
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
          )
        );
      });

      return new Order(orderModel.id, orderModel.customerId, orderItem);
    });

    return orders;
  }
}
