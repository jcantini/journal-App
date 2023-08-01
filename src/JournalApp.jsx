import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"


export const JournalApp = () => {
  return (
      <AppTheme> 
        <AppRouter /> 
      </AppTheme>
  )
}

// AppThemeves un high order component al que le paso como children AppRouter. De esta forma 
// el theme se le va a aplicar a toda la app