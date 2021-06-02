import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Info = ({ totalResults }) => (
  <Message>
    {totalResults === 1 && <p>La recherche a donné {totalResults} résultat</p>}
    {totalResults > 1 && <p>La recherche a donné {totalResults} résultats</p>}
    {totalResults === 0 && <p>La recherche n'a pas donné de résultats</p>}
  </Message>
);

Info.propTypes = {
  totalResults: PropTypes.number.isRequired,
};

export default Info;
