export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  category: "Concerts" | "Sports" | "Theater";
  ticketTypes: TicketType[];
}

export interface CartItem {
  event: Event;
  ticketType: TicketType;
  quantity: number;
}
