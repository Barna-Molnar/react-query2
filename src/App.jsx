import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SingleSuperHeroPage from './components/SingleSuperHeroPage';
import SuperHeroesPage from './components/SuperHeroes.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependentQueriesPage from './components/DependentQueries.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfinteQueriesPage from './components/InfiniteQueries.page';

// NOTE: Start you json-server in order to get data npm run serve-json

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-paginated'>RQ Paginated</Link>
            </li>
            <li>
              <Link to='/rq-dependent'>RQ Dependent queries</Link>
            </li>
            <li>
              <Link to='/rq-dynamic-parallel'>RQ Dynamyc parallel queries</Link>
            </li>
            <li>
              <Link to='/rq-infinite'>RQ infinite queries</Link>
            </li>
          </ul>
        </nav>
        <Routes>

          <Route path='/rq-infinite' element={<InfinteQueriesPage />} />
          <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
          <Route path='/rq-dependent' element={<DependentQueriesPage email='barnabas.molnar@something.com' />} />
          <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]} />} />
          <Route path='/rq-super-heroes/:heroId' element={<SingleSuperHeroPage />} />
          <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
          <Route path='/super-heroes' element={<SuperHeroesPage />} />
          <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;