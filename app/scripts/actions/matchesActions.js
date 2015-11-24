import Reflux from 'reflux';
import request from 'superagent';
import Config from '../config';


const MatchesActions = Reflux.createActions({
  'loadMatches': {children: ['completed', 'failed']}
});

MatchesActions.loadMatches.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  setTimeout(() => {
    const items = [{
      id: 1,
      home: 'MTL Canadiens',
      away: 'BOS Bruins',
    }, {
      id: 2,
      home: 'DET Red Wings',
      away: 'TOR Maple Leafs',
    }, {
      id: 3,
      home: 'VAN Canucks',
      away: 'NY Rangers',
    }, {
      id: 4,
      home: 'SJ Sharks',
      away: 'EDM Oilers',
    }];
    this.completed(items);

    let matches;
    request
      .get(Config.END_POINT + '/listedesmatchs')
      .then((response) => {
        console.log(response);
        matches = response;
      });
    //this.completed(matches);

    // on error
    // this.failed('an error occured');
  }, 500);
});

export default MatchesActions;
