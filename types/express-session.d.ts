import { Request } from "express";

declare module "express-session" {
  interface SessionData {
    user: { [key: string]: any };
    userId: string; // Add this property
  }

  // Extend the Request interface to include the session property
  export interface SessionRequest extends Request {
    session: SessionData & Partial<SessionData>;
  }
}
