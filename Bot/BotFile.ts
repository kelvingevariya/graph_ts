class Bot {
  private meetings: string[] = [];

  constructor(meetings: string[]) {
    this.meetings = meetings;
  }

  get allMeetings(): string[] {
    return this.meetings;
  }

  set setMeeting(meetingId: string) {
    this.meetings.push(meetingId);
  }
}

export default Bot;