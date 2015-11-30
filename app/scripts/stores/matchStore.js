import Reflux from 'reflux';
import MatchActions from '../actions/matchActions';

let MatchStore = Reflux.createStore({
  listenables: MatchActions,

  init() {
    this.match = null;
    this.paris = [];
  },

  loadParis() {
    this.trigger({
      loading: true
    });
  },

  loadParisCompleted(paris) {
    this.paris = paris;

    this.trigger({
      paris : this.paris,
      loading: false
    });
  },

  loadParisFailed(error) {
    this.trigger({
      error : error,
      loading: false
    });
  },

  loadMatch(id) {
    this.trigger({
      id: id,
      loading: true
    });
  },

  loadMatchCompleted(match) {
    let oldLength = this.match && this.match.penalties.length + this.match.goals.length;
    this.match = match;

    let newLength = this.match.penalties.length + this.match.goals.length;
    if (newLength > oldLength) {
      alert("Nouveaux evenements disponibles!");
    }

    this.trigger({
      match : this.match,
      loading: false,
      penaltiesLength: newLength,
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
