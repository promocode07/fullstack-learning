import type { Ticket } from "../types/ticket";

export const mockTickets: Ticket[] = [
  {
    id: "TIC-001",
    title: "Database connection timeout in Production",
    description: "The API is failing to connect to the RDS instance in the us-east-1 region.",
    status: "OPEN",
    priority: "URGENT",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "TIC-002",
    title: "Update Sharbati Aata product description",
    description: "Marketing needs the description updated for the new organic batch.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];