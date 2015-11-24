import Reflux from 'reflux';
import MatchesActions from '../actions/matchesActions';

let MatchesStore = Reflux.createStore({
  listenables: MatchesActions,

  init() {
    this.matches = [];
  },

  loadMatches() {
    this.trigger({
      loading: true
    });
  },

  loadMatchesCompleted(matches) {
    this.matches = matches;

    this.trigger({
      matches : this.matches,
      loading: false
    });
  },

  loadMatchesFailed(error) {
    this.trigger({
      error : error,
      loading: false
    });
  }

});

export default MatchesStore;
