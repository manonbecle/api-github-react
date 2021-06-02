// == Import npm
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';

// == Import - Internal
import logo from 'src/assets/images/logo-github.png';
import Info from 'src/components/Info';
import ReposResults from 'src/components/ReposResults';
import SearchBar from 'src/components/SearchBar';
import Faq from 'src/components/Faq';
import Navigation from 'src/components/Navigation';
import NotFound from 'src/components/NotFound';

// == Import - CSS
import 'semantic-ui-css/semantic.min.css';
import './styles.scss';

// == Composant
const App = () => {
  // nombre de résultat stocké dans le state
  const [totalResults, setTotalResults] = useState(0);

  // mise en place d'un champ controlé : l'input pour faire une recherche
  const [imputSeach, setImputSeach] = useState('');

  // une nouvelle entré dans le state pour les data filtrées (provenant de l'api)
  const [dataFilter, setDataFilter] = useState([]);

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = `Atelier GitHub | ${imputSeach}`;
  });

  // filtrer les résultats de recherche
  const filterResults = () => {
    // lancement du loading
    setIsLoading(true);
    // La valeur qui me sert de filtre est donc dans le state: imputSeach
    // Je dois appeler l'API avec la valeur de imputSearch
    axios.get(`https://api.github.com/search/repositories?q=${imputSeach}&sort=stars&order=desc&page=1&per_page=9`)
      .then((response) => {
        setDataFilter(response.data.items);
        setTotalResults(response.data.total_count);
      })
      .catch((error) => {
        console.log('error :', error);
      }).finally(() => {
        // fin du loading, quoi q'il arrive (erreur ou reponse)
        setIsLoading(false);
      });
  };

  // lors du clic sur "plus de résultat"
  const newChargement = () => {
    // lancement du loading
    setIsLoading(true);
    axios.get(`https://api.github.com/search/repositories?q=${imputSeach}&sort=stars&order=desc&page=${(dataFilter.length / 9) + 1}&per_page=9`)
      .then((response) => {
        setDataFilter([
          ...dataFilter,
          // utilisation de spread operator pour "aplatir" le tableau (récupérer les
          // éléments), sinon on intègrerait un tableau dans le tableau
          ...response.data.items,
        ]);
      })
      .catch((error) => {
        console.log('error :', error);
      }).finally(() => {
        // fin du loading, quoi q'il arrive (erreur ou reponse)
        setIsLoading(false);
      });
  };

  return (
    <div className="app">
      <div>
        <header className="header">
          <img src={logo} alt="Logo GitHub" />
        </header>
        <Navigation />
        <Switch>
          <Route path="/faq">
            <Faq />
          </Route>
          <Route exact path="/">
            <SearchBar
              value={imputSeach}
              setImputSeach={setImputSeach}
              filterResults={filterResults}
            />
            <Info totalResults={totalResults} />
            <ReposResults data={dataFilter} newChargement={newChargement} />
            {isLoading && (
            // "page" permet au composant Dimmer que le layer gris recouvre bien toute la page
              <Dimmer active page>
                <Loader />
              </Dimmer>
            )}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

// == Export
export default App;
