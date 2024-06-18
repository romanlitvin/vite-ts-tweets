import { FC } from 'react';
import Select from 'react-select';

export interface FollowOption {
  readonly value: string;
  readonly label: string;
}

interface DropdownProps {
  onChange: (option: FollowOption | null) => void;
}

const options: readonly FollowOption[] = [
  { value: 'show all', label: 'Show all' },
  { value: 'follow', label: 'Follow' },
  { value: 'followings', label: 'Followings' },
];

export const Dropdown: FC<DropdownProps> = ({ onChange }) => {
  return (
    <div className='App'>
      <Select
        defaultValue={options[0]}
        onChange={onChange}
        options={options}
        isSearchable={false}
        name='filter'
      />
    </div>
  );
};
