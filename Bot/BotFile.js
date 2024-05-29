class Bot {
  meetings = [];
  constructor(meetings) {
    this.meetings = meetings;
  }

  get allMeetings() {
    return this.meetings;
  }

  set setMeeting(meetingId) {
    this.meetings.push(meetingId);
  }
}
