import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { SurveyPage } from './pages/SurveyPage'
import { QuestionPage } from './pages/QuestionPage'
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
                path: '/yhteenveto/:userId',
                element: <SummaryPage />,
            },
            {
                path: '/yhteenveto/ryhma/:groupToken',
                element: <GroupSummaryPage />,
            },
            {
                path: '/tietovisa/yhteenveto',
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
