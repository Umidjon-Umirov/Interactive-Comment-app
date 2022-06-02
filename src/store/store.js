import { configureStore } from "@reduxjs/toolkit";
import commentReducer from './slice';
export default configureStore({
   reducer:{
      data:commentReducer
   }
})