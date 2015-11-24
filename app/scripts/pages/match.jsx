import React from 'react';
import ItemList from '../components/itemList.jsx';
import MatchStore from '../stores/matchStore';
import MatchActions from '../actions/matchActions';

class Match extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: null,
      match : [],
      loading: false
    };
  }

  onRefresh(e) {
    e.preventDefault();
    console.log("Refresh");
    MatchActions.loadMatch(this.props.params.id);
  }

  componentDidMount() {
    this.unsubscribe = MatchStore.listen(this.onStatusChange.bind(this));
    MatchActions.loadMatch(this.props.params.id);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {
    console.log(this.state.match)
    let match = this.state.match;
    let events = match.evenements ?
                 this.state.match.evenements.map(item => <li key={item}>{item}</li>) :
                 null;

    return (
      <div>
      <div className="matchContainer">
        <div className="teamNames">
          <div className="home">{this.state.match.home}</div>
          <div className="away">{this.state.match.away}</div>
        </div>
        <div className="teamScores">
          <div className="homeScore">{this.state.match.homeScore}</div>
          <div className="awayScore">{this.state.match.awayScore}</div>
        </div>
      </div>
      <div className="time">
        13:00
      </div>
      <div className="eventContainer">
      <h2>Evenements</h2>
      <ul>
        {events}
      </ul>
      </div>
      <div className="buttonRow">
        <a href="#" className="buttonHockey" onClick={this.onRefresh.bind(this)}>Rafraichir</a> <a href="#/match/1/bet" className="buttonHockey">Parier</a>
      </div>
      </div>
    );
  }
}

export default Match;
