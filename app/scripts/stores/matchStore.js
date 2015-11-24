import Reflux from 'reflux';
import MatchActions from '../actions/matchActions';

let MatchStore = Reflux.createStore({
  listenables: MatchActions,

  init() {
    this.match = [];
  },

  loadMatch(id) {
    this.trigger({
      id: id,
      loading: true
    });
  },

  loadMatchCompleted(match) {
    this.match = match;

    this.trigger({
      match : this.match,
      loading: false
    });
  },

  loadMatchFailed(error) {
    this.trigger({
      error : error,
      loading: false
    });
  }

});

export default MatchStore;
