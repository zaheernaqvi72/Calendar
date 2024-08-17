import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../utils/eventUtils';

const FilterEvents = ({ onFilterChange }) => {
  return (
    <div className="mb-4 shadow-sm">
      <Select
        label="Filter"
        defaultValue="All"
        onChange={e => onFilterChange(e.target.value)}
        fullWidth
      >
        <MenuItem value="All">All</MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

FilterEvents.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterEvents;
