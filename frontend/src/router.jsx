import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { RoleSurveyPage } from './pages/RoleSurveyPage'
import { RoleSurveySummaryPage } from './pages/RoleSurveySummaryPage'
import { RoleSurveyQuestionPage } from './pages/RoleSurveyQuestionPage'
import { FactQuizQuestionPage } from './pages/FactQuizQuestionPage'
import { RoleSurveyGroupSummaryPage } from './pages/RoleSurveyGroupSummaryPage'
import { FactQuizSummaryPage } from './pages/FactQuizSummaryPage'
import { FaqPage } from './pages/FaqPage'

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
                path: '/ilmastoroolikysely',
                element: <RoleSurveyPage />,
            },
            {
                path: '/kysymys/:questionId',
                element: <RoleSurveyQuestionPage />,
            },
            {
                path: '/oppimisvisa/:questionId',
                element: <FactQuizQuestionPage />,
            },
            {
                path: '/yhteenveto/:userId',
                element: <RoleSurveySummaryPage />,
            },
            {
                path: '/yhteenveto/ryhma/:groupToken',
                element: <RoleSurveyGroupSummaryPage />,
            },
            {
                path: '/oppimisvisa/yhteenveto',
                element: <FactQuizSummaryPage />,
            },
            {
                path: '/faq',
                element: <FaqPage />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
