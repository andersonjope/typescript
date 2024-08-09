import SendEmailWhenProductIsCreateHandler from "../../../domain/event/handler/send.email.when.product.is.create.handler";
import EventDispactcher from "../../../domain/event/@shared/eventDispatcher";
import ProductCreateEvent from "../../../domain/event/product.create.event";

describe("Domain events tests", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("Should unregister an event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreateEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(
      0
    );
  });

  it("Should unregister all event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeUndefined();
  });

  it("Should notify all event handler", () => {
    const eventDispatcher = new EventDispactcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreateEvent = new ProductCreateEvent({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    eventDispatcher.notify(productCreateEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
