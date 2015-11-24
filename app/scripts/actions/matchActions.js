import Reflux from 'reflux';

const MatchActions = Reflux.createActions({
  'loadMatch': {children: ['completed', 'failed']}
});

MatchActions.loadMatch.listen(function(id){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  console.log(id);
  setTimeout(() => {
    const match = {
      home: 'MTL Canadiens',
      away: 'BOS Bruins',
      homeScore: 1,
      awayScore: 3,
      evenements: [
        'Penalite par Carey Price',
        'But par Pacioretty',
        'Something Seomthing Something',
      ]
    }
    this.completed(match);

    // on error
    // this.failed('an error occured');
  }, 500);
});

export default MatchActions;
