import Reflux from 'reflux';
import request from 'superagent';
import Config from '../config';

const MatchActions = Reflux.createActions({
  'loadMatch': {children: ['completed', 'failed']}
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

export default MatchActions;
