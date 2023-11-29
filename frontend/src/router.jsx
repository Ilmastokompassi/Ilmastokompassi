import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { RoleSurveyPage } from './pages/RoleSurveyPage'
import { RoleSurveyQuestionPage } from './pages/RoleSurveyQuestionPage'
import { SummaryPage } from './pages/SummaryPage'
import { FactQuizQuestionPage } from './pages/FactQuizQuestionPage'
import { GroupSummaryPage } from './pages/GroupSummaryPage'
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
                element: <SummaryPage />,
            },
            {
                path: '/yhteenveto/ryhma/:groupToken',
                element: <GroupSummaryPage />,
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
