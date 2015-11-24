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
  }

  componentDidMount() {
    this.unsubscribe = MatchesStore.listen(this.onStatusChange.bind(this));
    MatchesActions.loadMatches();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h1>Liste des matchs</h1>
        <ItemList { ...this.state } />
      </div>
    );
  }
}

export default Home;
