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
