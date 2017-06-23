import { List, Map } from 'immutable';
import update from 'react-addons-update';

const image_paths_init = List([]);
//expect array elements to be dictionaries with {
//timestamp (lastupdated), imageUrl, location}

function removeItem(array, action) {
    return [
        ...array.slice(0, action.index),
        ...array.slice(action.index + 1)
    ];
}

export default function image_paths(image_paths=image_paths_init, action) {
  switch(action.type) {
    case 'ADD_IMAGE':
      return [...image_paths, action.item];
    case 'DELETE_IMAGE':
      return removeItem(image_paths, action);
    case 'UPDATE_IMAGE':
        return [
            ...image_paths.slice(0, action.index),
            action.item,
            ...image_paths.slice(action.index+1)
        ]

    default:
      return image_paths;
  }
}

