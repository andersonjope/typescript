import { v4 as uuid } from "uuid";
import EventDispactcher from "../../../domain/event/@shared/eventDispatcher";
import CustomerCreateEvent from "../../../domain/event/customer.create.event";
import EnviaConsoleLog1CreateHandler from "../../../domain/event/handler/envia.console.log1.create.handler";
import EnviaConsoleLog2CreateHandler from "../../../domain/event/handler/envia.console.log2.create.handler";
import EnviaConsoleLogCreateHandler from "../../../domain/event/handler/envia.console.log.create.handler";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";

describe("Domain customer events tests", () => {
  it("Should customer register an event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler1 = new EnviaConsoleLog1CreateHandler();
    const eventHandler2 = new EnviaConsoleLog2CreateHandler();

    eventDispatcher.register("CustomerCreateEvent1", eventHandler1);
    eventDispatcher.register("CustomerCreateEvent2", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent1"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent2"]
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent1"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent2"][0]
    ).toMatchObject(eventHandler2);
  });

  it("Should customer unregister an event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler1 = new EnviaConsoleLog1CreateHandler();
    const eventHandler2 = new EnviaConsoleLog2CreateHandler();

    eventDispatcher.register("CustomerCreateEvent1", eventHandler1);
    eventDispatcher.register("CustomerCreateEvent2", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent1"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent2"][0]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreateEvent1", eventHandler1);
    eventDispatcher.unregister("CustomerCreateEvent2", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent1"].length
    ).toBe(0);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent2"].length
    ).toBe(0);
  });

  it("Should customer unregister all event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler1 = new EnviaConsoleLog1CreateHandler();
    const eventHandler2 = new EnviaConsoleLog2CreateHandler();

    eventDispatcher.register("CustomerCreateEvent1", eventHandler1);
    eventDispatcher.register("CustomerCreateEvent2", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent1"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent2"][0]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent1"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent2"]
    ).toBeUndefined();
  });

  it("Should customer notify log 1 event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new EnviaConsoleLog1CreateHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreateEvent = new CustomerCreateEvent({
      id: "1",
      name: "Customer 1",
    });

    eventDispatcher.notify(customerCreateEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("Should customer notify log 2 event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new EnviaConsoleLog2CreateHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreateEvent = new CustomerCreateEvent({
      id: "1",
      name: "Customer 2",
    });

    eventDispatcher.notify(customerCreateEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("Should customer notify log alter address event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new EnviaConsoleLogCreateHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
    ).toMatchObject(eventHandler);

    const address = new Address("Street 1", 10, "City 1", "ST", "64057-153");

    const customer = new Customer(uuid(), "Customer 1");
    customer.changeAddress(address);

    expect(customer.address.street).toBe("Street 1");

    const customerCreateEvent = new CustomerCreateEvent({
      id: customer.id,
      name: customer.name,
      endereco: customer.address.toString(),
    });

    eventDispatcher.notify(customerCreateEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
