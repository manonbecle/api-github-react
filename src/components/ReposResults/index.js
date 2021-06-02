import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './reposResults.scss';

const ReposResults = ({ data, newChargement }) => (
  <div>
    <Grid>
      <Grid.Row columns={3} stretched>
        {data.map((element) => (
          <Grid.Column key={element.id} className="presentation">
            <Segment.Group piled>
              <Segment>
                <img className="avatar" src={element.owner.avatar_url} alt="" />
              </Segment>
              <Segment>
                <h2>{element.name}</h2>
                <em>{element.owner.login}</em>
                <p>{element.description}</p>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
    <Button
      onClick={() => {
        newChargement();
      }}
    >
      Plus de résultats
    </Button>
  </div>
);

ReposResults.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
  newChargement: PropTypes.func.isRequired,
};

export default ReposResults;
