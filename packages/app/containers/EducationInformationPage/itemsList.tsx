import React from 'react';

import SelectPicker from '../../components/SelectPicker';
import { getLvlName } from './utils';
import { loadChildItems, saveOtherEducationInformation } from './ducks';
import { ItemsListProps } from './types';
import AddItem from './AddItem';
import messages from './messages';

const ItemsList: React.SFC<ItemsListProps> = ({
  items,
  level,
  loadChildItems,
  showAddPress,
  onSubmit,
  userType,
  ...props
}) => {
  const getSelected = (level: number) => {
    if (level === 1) {
      return items.selectedLvl1;
    } else if (level === 2) {
      return items.selectedLvl2;
    } else if (level === 3) {
      return items.selectedLvl3;
    } else if (level === 4) {
      return items.selectedLvl4;
    }
    return items.selectedLvl1;
  };
  const getLevelAsKey = (level: number) => {
    if (level === 1) {
      return 'lvl1';
    } else if (level === 2) {
      return 'lvl2';
    } else if (level === 3) {
      return 'lvl3';
    } else if (level === 4) {
      return 'lvl4';
    }
    return 'lvl1';
  };

  console.log('xxx', items);

  if (items[getLevelAsKey(level)].length === 0) {
    return null;
  }

  if (getLvlName(items.selectedRoot, level, userType) === undefined) {
    return null;
  }

  console.log('erewrewe', getLvlName(items.selectedRoot, level, userType));

  return (
    <SelectPicker
      label={props.intl.formatMessage(
        // @ts-ignore
        messages[getLvlName(items.selectedRoot, level, userType)]
      )}
      // label={intl.formatMessage(
      //   getLvlName(items.selectedRoot, level, userType)
      // )}
      // label={items}
      placeholder=' '
      selected={getSelected(level)}
      onSelect={parent_id => {
        const p_id =
          typeof parent_id === 'string' ? parseFloat(parent_id) : parent_id;
        loadChildItems(p_id);
      }}
      showAdd={
        items.selectedRoot === 3 || items.selectedRoot === 4 ? true : false
      }
      // showAddPress={() => {
      //   _showDialog();
      // }}
      showAddContent={() => (
        <AddItem
          onSubmit={(parent_id, item_name, action) => {
            onSubmit && onSubmit(items.selectedRoot, item_name, action);
          }}
        />
      )}
      options={items[getLevelAsKey(level)].map((d, k) => {
        return {
          value: d.id,
          label: props.language === 'ar' ? d.name_ar : d.name
        };
      })}
    />
  );
};

export default ItemsList;
