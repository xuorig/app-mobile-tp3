import Reflux from 'reflux';
import request from 'superagent';
import Config from '../config';


const MatchesActions = Reflux.createActions({
  'loadMatches': {children: ['completed', 'failed']}
});

MatchesActions.loadMatches.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here

  var matches;
  request
    .get(Config.END_POINT + '/ift604REST/ift604rest/listedesmatchs')
    .then((response) => {
      console.log(response.body);
      matches = response.body.matchs;
      console.log(matches);
      this.completed(matches);
    });
});

export default MatchesActions;
