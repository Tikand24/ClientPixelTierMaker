import './App.css';
import LoadingOrError from './components/LoadingOrError';
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryCreate from './pages/Master/CategoryCreate';
import TemplateCreate from './pages/Master/TemplateCreate';

const Home = lazy(async () => import('./pages/Home'));
const CreateTier = lazy(async () => import('./pages/CreateTier'));

export default function App(): ReactElement {
  return (
    <div className="container px-48 pt-12 mx-auto">
      <BrowserRouter>
        <Suspense fallback={<LoadingOrError />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="master/create-category" element={<CategoryCreate />} />
            <Route path="master/create-template" element={<TemplateCreate />} />
            <Route path=":id" element={<CreateTier />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
