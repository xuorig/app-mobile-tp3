import React from 'react';

const ItemListItem = (props) => {
    let match = props.match;
    return (
      <div className="match">
        <p><a href="#/match/1">{match.home} VS {match.away}</a></p>
      </div>
    );
};

export default ItemListItem;
