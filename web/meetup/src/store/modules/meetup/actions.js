export function updateMeetupRequest(data) {
  return {
    type: '@mettup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(datameetup) {
  return {
    type: '@meetup/UPLOAD_MEETUP_SUCCESS',
    payload: { datameetup },
  };
}

export function updateMeetupFailure() {
  return {
    type: '@meetup/UPLOAD_MEETUP_FAILURE',
  };
}
