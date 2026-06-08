import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Shell } from '@/components/layout/Shell'
import { Home } from '@/routes/Home'
import { About } from '@/routes/About'
import { Work } from '@/routes/Work'
import { Stack } from '@/routes/Stack'
import { Contact } from '@/routes/Contact'
import { NotFound } from '@/routes/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'work', element: <Work /> },
      { path: 'stack', element: <Stack /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
