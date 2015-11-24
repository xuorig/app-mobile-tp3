import React from 'react';
import ItemListItem from './itemListItem.jsx';

const ItemList = (props) => {
    let matches = props.matches.map(item => <ItemListItem key={item.home} match={item}/>),
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
