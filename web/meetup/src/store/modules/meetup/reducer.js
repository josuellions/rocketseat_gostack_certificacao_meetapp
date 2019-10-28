import produce from 'immer';

const INITIAL_STATE = {
  datameetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@mettup/UPDATE_MEETUP_REQUEST': {
        // draft.loading = true;
        draft.datameetup = action.payload.meetup;
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.datameetup = action.payload.datameetup;
        break;
      }
      case '@meetup/UPLOAD_MEETUP_FAILURE': {
        // draft.loading = false;
        break;
      }
      default:
    }
  });
}
