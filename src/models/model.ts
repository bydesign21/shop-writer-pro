export enum UserRole {
  USER = 'user',
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export enum TicketStatus {
  RESOLVED = 'resolved',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in progress',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export const NonAdminRoles = [UserRole.USER, UserRole.EMPLOYEE];

export const closedTicketStatuses = [
  TicketStatus.COMPLETED,
  TicketStatus.CANCELLED,
  TicketStatus.REFUNDED,
  TicketStatus.RESOLVED,
];

export enum UploadFileStatus {
  ERROR = 'error',
  SUCCESS = 'success',
  UPLOADING = 'uploading',
  DONE = 'done',
  REMOVED = 'removed',
}
