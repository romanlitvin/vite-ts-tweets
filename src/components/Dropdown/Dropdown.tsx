import { FC } from 'react';
import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import type { FollowOption } from '../../types/types';

export interface DropdownProps {
  onChange: (
    option: SingleValue<FollowOption> | null,
    actionMeta: ActionMeta<FollowOption>
  ) => void;
}

const options: readonly FollowOption[] = [
  { value: 'show all', label: 'Show all' },
  { value: 'follow', label: 'Follow' },
  { value: 'followings', label: 'Followings' },
];

const customStyles: StylesConfig<FollowOption, false> = {
  control: (provided) => ({
    ...provided,
    width: '150px',
  }),
};

export const Dropdown: FC<DropdownProps> = ({ onChange }) => {
  return (
    <div className='App'>
      <Select
        defaultValue={options[0]}
        onChange={onChange}
        options={options}
        isSearchable={false}
        name='filter'
        styles={customStyles}
      />
    </div>
  );
};
