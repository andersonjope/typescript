import EventHandlerInterface from "../@shared/event.handler.interface";
import ProductCreateEvent from "../product.create.event";

export default class SendEmailWhenProductIsCreateHandler
  implements EventHandlerInterface<ProductCreateEvent>
{
  handle(event: ProductCreateEvent): void {
    console.log("Sending emial to ...");
  }
}
