import React from 'react';
import MatchStore from '../stores/matchStore';
import MatchActions from '../actions/matchActions';

class Bet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: null,
      match : [],
      loading: false
    };
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

  onParis(e) {
    e.preventDefault();
    console.log("parier");
  }

  render() {
    let match = this.state.match;
    return (
      <div>
        <h1> Parier sur le match {match.home} vs {match.away}</h1>
        <div>
        <div>
        <label>Parier sur</label>
        <select>
          <option>{match.home}</option>
          <option>{match.away}</option>
        </select>
        </div>
        <div>
        <label>Montant</label>
        <input type="text"/>
        </div>
        </div>
        <div>
        <button type="submit" href="#" onClick={this.onParis.bind(this)}>Parier</button>
        </div>
      </div>
    );
  }
}

export default Bet;
