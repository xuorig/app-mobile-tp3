import React from 'react';

const ItemListItem = (props) => {
    let match = props.match;
    return (
      <div className="match">
        <p><a href={"#/match/"+match.id}>{match.home.name} VS {match.away.name}</a></p>
      </div>
    );
};

export default ItemListItem;
