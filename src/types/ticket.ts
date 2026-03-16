export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export interface Ticket {
    id: string;
    title: string;
    status: TicketStatus;
    description: string;
    priority: TicketPriority;
    createdAt?: Date;
    updatedAt?: Date;

    assignedTo?: string;

}

