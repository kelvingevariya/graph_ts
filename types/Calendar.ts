export type Calendar = {
  "@odata.etag": string;
  id: string;
  subject: string;
  start: StartOrEnd;
  end: StartOrEnd;
  organizer: Organizer;
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
