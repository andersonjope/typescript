import EventHandlerInterface from "../@shared/event.handler.interface";
import CustomerCreateEvent from "../customer.create.event";

export default class EnviaConsoleLog1CreateHandler
  implements EventHandlerInterface<CustomerCreateEvent>
{
  handle(event: CustomerCreateEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
