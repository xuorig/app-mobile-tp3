import Reflux from 'reflux';
import request from 'superagent';
import Config from '../config';

const MatchActions = Reflux.createActions({
  'loadMatch': {children: ['completed', 'failed']},
  'loadParis': {children: ['completed', 'failed']}
});

MatchActions.loadMatch.listen(function(id){
  console.log(id);
  var match;
  request
    .get(Config.END_POINT + '/ift604REST/ift604rest/listedesmatchs/' + id)
    .then((response) => {
      match = response.body;
      this.completed(match);
    });
});

MatchActions.loadParis.listen(function(){
  var paris;
  request
    .get(Config.END_POINT + '/ift604REST/ift604rest/paris')
    .then((response) => {
      paris = response.body;
      this.completed(paris);
    });
});
export default MatchActions;
