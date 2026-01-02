import { Outlet } from 'react-router-dom'
import { Header } from './Header'

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background flex flex-col font-sans text-foreground">
      <Header />
      <main className="flex-1 w-full container max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
