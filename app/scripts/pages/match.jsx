import React from 'react';
import ItemList from '../components/itemList.jsx';
import MatchStore from '../stores/matchStore';
import MatchActions from '../actions/matchActions';

class Match extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: null,
      match : null,
      loading: false,
      penaltiesLength: null,
    };
    this.timer = null;
  }

  onRefresh(e) {
    if (e) {
      e.preventDefault();
    }
    console.log("Refresh");
    MatchActions.loadMatch(this.props.params.id);
  }

  componentDidMount() {
    this.unsubscribe = MatchStore.listen(this.onStatusChange.bind(this)).bind(this);
    MatchActions.loadMatch(this.props.params.id);
    // Fetch match every 2 minutes
    this.timer = setInterval(this.onRefresh.bind(this), 5000);
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.timer);
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {
    console.log(this.state.match)
    let match = this.state.match;

    if (!this.state.match) {
      return (
        <div>Loading...</div>
      )
    }

    let penalties = this.state.match.penalties.map((pen) => {
      return <li>{pen.team.name} - #{pen.player.number} {pen.player.name}</li>
    })

    let goals = this.state.match.goals.map((pen) => {
      return <li>{pen.team.name} - #{pen.player.number} {pen.player.name}</li>
    })

    let seconds = (this.state.match.period === 3 && this.state.match.clock <= 0) ?
        <div>Game Over</div> : <div>{this.state.match.clock} seconds left</div>

    return (
      <div>
      <div className="matchContainer">
        <div className="teamNames">
          <div className="home">{this.state.match.home.name}</div>
          <div className="away">{this.state.match.away.name}</div>
        </div>
        <div className="teamScores">
          <div className="homeScore">{this.state.match.score.home}</div>
          <div className="awayScore">{this.state.match.score.away}</div>
        </div>
      </div>
      <div className="time">
        <div>Period {this.state.match.period}</div>
        {seconds}
      </div>
      <div className="eventContainer">
      <h2>Evenements</h2>
      <h3>Goals</h3>
      <ul>
        {goals}
      </ul>
      <h3>Penalties</h3>
      <ul>
        {penalties}
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
