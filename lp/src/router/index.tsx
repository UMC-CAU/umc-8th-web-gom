import { createBrowserRouter, RouteObject } from 'react-router-dom'
import RootLayout from '../app/layout/layout'
import HomePage from '../app/page'
import SignInPage from '../app/common/signinzod'
import SignUpPage from '../app/common/signup'
import MyPage from '../app/mypage/mypage'
import ErrorPage from '../app/errorpage'
import GoogleLoginRedirectPage from '../app/common/googlelogin'
import ProtectedLayout from '../app/layout/protectedlayout'
import LpDetailPage from '../app/detail/lpdetail'

const protectedRoute: RouteObject[] = [
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/my',
                element: <MyPage />,
            },
            {
                path: '/lp/:lpId',
                element: <LpDetailPage />,
            },
        ],
    },
]

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/signin',
                element: <SignInPage />,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
            {
                path: '/v1/auth/google/callback',
                element: <GoogleLoginRedirectPage />,
            },
            {
                element: <ProtectedLayout />,
                children: protectedRoute,
            },
        ],
    },
])
