import EventHandlerInterface from "../@shared/event.handler.interface";
import CustomerCreateEvent from "../customer.create.event";

export default class EnviaConsoleLog2CreateHandler
  implements EventHandlerInterface<CustomerCreateEvent>
{
  handle(event: CustomerCreateEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
