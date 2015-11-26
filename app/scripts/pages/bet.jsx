import React from 'react';
import MatchStore from '../stores/matchStore';
import MatchActions from '../actions/matchActions';
import request from 'superagent';
import Config from '../config';


class Bet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: null,
      match : null,
      loading: false,
      message: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = MatchStore.listen(this.onStatusChange.bind(this)).bind(this);
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

    let amount = this.refs.amount.value;
    let teamId = this.refs.team.value;
    let match_id = this.state.match.id;
    let _this = this;

    request
      .post(Config.END_POINT + '/ift604REST/ift604rest/paris')
      .send({
        matchId: match_id,
        amount: amount,
        teamId: teamId,
        userId: 1,
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.ok) {
          _this.setState({message: 'Merci pour le paris!'})
        } else {
          _this.setState({message: 'Erreur avec votre paris!'})
        }
      })
  }

  render() {
    let match = this.state.match;
    if (!match) {
      return (
        <div>No match.</div>
      )
    }

    let message = this.state.message ? <div className="message">{this.state.message}</div> :
                  <div></div>

    return (
      <div>
        <h1> Parier sur le match {match.home.name} vs {match.away.name}</h1>
        <div>
          {message}
        <div>
        <label>Parier sur</label>
        <select ref="team">
          <option value={match.home.id}>{match.home.name}</option>
          <option value={match.away.id}>{match.away.name}</option>
        </select>
        </div>
        <div>
        <label>Montant</label>
        <input type="text" ref="amount"/>
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
