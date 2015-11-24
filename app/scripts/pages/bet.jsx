import React from 'react';

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

  }

  componentWillUnmount() {
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>Parier</div>
    );
  }
}

export default Bet;
