import React from 'react';
import ItemListItem from './itemListItem.jsx';

const ItemList = (props) => {
    for (var key in props.matches) {
      console.log(props.matches[key]);
    }
    let matches = props.matches.map(item => <ItemListItem key={item.home.name} match={item}/>),
      loading = props.loading ? <div className="loading-label">Loading...</div> : '';

    return (
      <div>
        {loading}
        <ul>
          {matches}
        </ul>
      </div>
    );
};

export default ItemList;
