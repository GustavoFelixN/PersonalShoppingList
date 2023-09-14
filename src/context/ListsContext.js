import { createContext, useCallback, useReducer } from 'react';
import useDataFetching from '../hooks/useDataFetching';

export const ListContext = createContext();

const initialState = {
	lists: [],
	loading: false,
	error: '',
};

const reducer = (state, action) => {
	switch(action.type) {
		case 'GET_LISTS_SUCCESS':
			return {
				...state,
				lists: action.payload,
				loading: false,
			};
		case 'GET_LISTS_ERROR':
			return {
				...state,
				lists: [],
				loading: false,
				error: action.payload,
			}
		default:
			return state;
	}
};

export const ListContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchLists = useCallback(async () => {
		try {
			const data = await fetch('https://my-json-server.typicode.com/GustavoFelixN/PersonalShoppingList/lists');
			const result = await data.json();
			if (result) {

				dispatch({type: 'GET_LISTS_SUCCESS', payload: result});
			}
		} catch(e) {

			dispatch({type: 'GET_LISTS_ERROR', payload: e.message})
		}
	}, []);

	return (
		<ListContext.Provider value={{...state, fetchLists}}>
			{children}
		</ListContext.Provider>
	);
};

export default ListContext;
