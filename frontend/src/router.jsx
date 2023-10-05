import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { MaterialPage } from './pages/MaterialPage'
import { SurveyPage } from './pages/SurveyPage'
import { QuestionPage } from './pages/QuestionPage'
import { ClimateProfilePage } from './pages/ClimateProfilePage'
import { OwnClimateProfilePage } from './pages/OwnClimateProfilePage'

// Defines the routes of the application
export const routes = [
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            {
                path: '/survey',
                element: <SurveyPage />,
            },
            {
                path: '/question/:questionId',
                element: <QuestionPage />,
            },
            {
                path: '/material',
                element: <MaterialPage />,
            },
            {
                path: '/profiles',
                element: <ClimateProfilePage />,
            },
            {
                path: '/profile',
                element: <OwnClimateProfilePage />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
