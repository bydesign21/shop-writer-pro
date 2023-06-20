export enum UserRole {
  USER = 'user',
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}

export enum TicketStatus {
  RESOLVED = 'resolved',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export const closedTicketStatuses = [
  TicketStatus.RESOLVED,
  TicketStatus.CANCELLED,
  TicketStatus.REFUNDED
];

export enum UploadFileStatus {
  ERROR = 'error',
  SUCCESS = 'success',
  UPLOADING = 'uploading',
  DONE = 'done',
  REMOVED = 'removed'
}
