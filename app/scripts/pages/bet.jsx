import React from 'react';
import MatchStore from '../stores/matchStore';
import MatchActions from '../actions/matchActions';
import request from 'superagent';
import Config from '../config';
import _ from 'lodash';


class Bet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: null,
      match : null,
      paris: null,
      loading: false,
      message: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = MatchStore.listen(this.onStatusChange.bind(this)).bind(this);
    MatchActions.loadMatch(this.props.params.id);
    MatchActions.loadParis();
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
          console.log(err);
          console.log(res);
          _this.setState({message: 'Erreur avec votre paris: ' + res.body.exceptionMessage});
        }
      })
  }

  render() {
    let match = this.state.match;
    if (!match) {
      return (
        <div>No match.</div>
      );
    }

    if (this.state.paris && this.state.paris.length > 0) {
      let userParis = _(this.state.paris).filter((paris) => {
        return paris.userId === 1 && paris.matchId == match.id
      }).value()[0];

      let teamName = match.home.id === userParis.teamId ? match.home.name : match.away.name;
      var parisMessage = <div>Vous avez parier {userParis.amount} dollars sur {teamName}</div>
    }


    let message = this.state.message ? <div className="message">{this.state.message}</div> :
                  <div></div>

    return (
      <div>
        <h1> Parier sur le match {match.home.name} vs {match.away.name}</h1>
        <div>
          {message}
        <div>
        <div>
          {parisMessage}
        </div>
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
