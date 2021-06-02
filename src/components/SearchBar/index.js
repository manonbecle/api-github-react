import React, { useEffect, useRef } from 'react';
import { Input, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, setImputSeach, filterResults }) => {
  const refInput = useRef(null);

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <Segment>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          // une fois que l'input est complet (champ controlé)
          // l'evenement submit déclenche une fonction qui va filtrer les résultats
          filterResults();
        }}
      >
        <Input
          ref={refInput}
          fluid
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          // value est "forcée", elle contient ce que le state renvoi
          // lors de l'evenement onChange, on met à jour le state
          // qui du coup va venir modifier value => champ controlé
          value={value}
          onChange={(event) => {
            setImputSeach(event.target.value);
          }}
        />
      </form>
    </Segment>
)};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  setImputSeach: PropTypes.func.isRequired,
  filterResults: PropTypes.func.isRequired,
};

export default SearchBar;
