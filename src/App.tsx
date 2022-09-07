import './App.css';
import LoadingOrError from './components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(async () => import('./pages/Home'))
const CreateTier = lazy(async () => import('./pages/CreateTier'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path=':id' element={<CreateTier />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}