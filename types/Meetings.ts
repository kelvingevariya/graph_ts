export type Meetings = {
  "@odata.etag": string;
  id: string;
  subject: string;
  isOnlineMeeting: boolean;
  start: StartOrEnd;
  end: StartOrEnd;
  organizer: Organizer;
  onlineMeeting: OnlineMeeting;
};
export type StartOrEnd = {
  dateTime: string;
  timeZone: string;
};
export type Organizer = {
  emailAddress: EmailAddress;
};
export type EmailAddress = {
  name: string;
  address: string;
};
export type OnlineMeeting = {
  joinUrl: string;
};
