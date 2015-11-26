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
    let array_matches;
    console.log(matches);
    if (matches) {
      array_matches = Object.keys(matches).map(function(key) {
        return matches[key];
      });
    } else {
      array_matches = []
    }
    console.log(array_matches);
    this.matches = array_matches;

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
