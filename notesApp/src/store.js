import { configureStore, Tuple } from '@reduxjs/toolkit'
import pastereducer from './redux/pasteSlice'

export const store = configureStore({
  reducer:{
    paste: pastereducer,
  },
  
//   middleware: () => new Tuple(additionalMiddleware, logger),
})