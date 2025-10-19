import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import playersReducer from "../features/players/PlayersSlice";
import matchesReducer from "../features/matches/MatchesSlice";

const persistConfig = {
  key: "one-piece",
  storage,
};

const rootReducer = combineReducers({
  players: playersReducer,
  matches: matchesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
