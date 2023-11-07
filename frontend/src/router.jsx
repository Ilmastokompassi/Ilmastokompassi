import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { SurveyPage } from './pages/SurveyPage'
import { QuestionPage } from './pages/QuestionPage'
import { ClimateProfilePage } from './pages/ClimateProfilePage'
import { SummaryPage } from './pages/SummaryPage'
import { FactQuizQuestionPage } from './pages/FactQuizQuestionPage'
import { GroupSummaryPage } from './pages/GroupSummaryPage'
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
                path: '/kyselyt',
                element: <SurveyPage />,
            },
            {
                path: '/kysymys/:questionId',
                element: <QuestionPage />,
            },
            {
                path: '/tietovisa/:questionId',
                element: <FactQuizQuestionPage />,
            },
            {
                path: '/profiilit',
                element: <ClimateProfilePage />,
            },
            {
                path: '/yhteenveto/:userId',
                element: <SummaryPage />,
            },
            {
                path: '/yhteenveto/ryhma/:groupToken',
                element: <GroupSummaryPage />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
