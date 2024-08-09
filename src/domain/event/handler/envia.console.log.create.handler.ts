import EventHandlerInterface from "../@shared/event.handler.interface";
import CustomerCreateEvent from "../customer.create.event";

export default class EnviaConsoleLogCreateHandler
  implements EventHandlerInterface<CustomerCreateEvent>
{
  handle(event: CustomerCreateEvent): void {
    console.log(
      "Endereço do cliente: " +
        event.eventData.id +
        ", " +
        event.eventData.name +
        " alterado para: " +
        event.eventData.endereco
    );
  }
}
