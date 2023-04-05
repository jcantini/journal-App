import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"


export const JournalApp = () => {
  return (
      <AppTheme> 
        <AppRouter />
      </AppTheme>
  )
}

// envuelvo a AppRouter con AppTheme para aplicarle el theme a toda la app