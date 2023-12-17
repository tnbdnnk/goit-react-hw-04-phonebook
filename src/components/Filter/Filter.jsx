import PropTypes from 'prop-types';

import css from './Filter.module.css';

export function Filter({ filter, handleFilterChange }) {
    return (
        <label className={css.label} htmlFor='filterInput'>
            Find contacts by name 
            <input
                id='filterInput'
                className={css.input}
                input={filter}
                type='text'
                name='filter'
                onChange={handleFilterChange}
            />
        </label>
    );
};

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
};