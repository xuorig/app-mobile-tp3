import React from 'react';
import ItemList from '../components/itemList.jsx';
import MatchesStore from '../stores/matchesStore';
import MatchesActions from '../actions/matchesActions';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      matches : [],
      loading: false
    };
    this.interval = null;
  }

  componentDidMount() {
    this.unsubscribe = MatchesStore.listen(this.onStatusChange.bind(this));
    MatchesActions.loadMatches();
    this.interval = setInterval(this.onRefresh.bind(this), 5000);
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.interval);
  }

  onStatusChange(state) {
    this.setState(state);
  }

  onRefresh(e) {
    console.log("REFRESH!");
    MatchesActions.loadMatches();
  }

  render() {
    return (
      <div>
        <h1>Liste des matchs</h1>
        <ItemList { ...this.state } />
        <button onClick={this.onRefresh.bind(this)}>Update</button>
      </div>
    );
  }
}

export default Home;
