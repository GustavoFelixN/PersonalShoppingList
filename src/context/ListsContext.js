import { createContext, useCallback, useReducer } from 'react';
import useDataFetching from '../hooks/useDataFetching';

export const ListContext = createContext();

const initialState = {
	lists: [],
	list: {},
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
		case 'GET_LIST_SUCCESS':
			return {
				...state,
				list: action.payload,
				loading: false,
			}
		case 'GET_LIST_ERROR':
			return {
				...state,
				list: {},
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

	const fetchList = useCallback(async (listId) => {
		try {
			const data = await fetch(`https://my-json-server.typicode.com/GustavoFelixN/PersonalShoppingList/list/${listId}`);
			const result = data.json()
			if (result) {
				dispatch({ype: 'GET_LIST_SUCCESS', payload: result})
			}
		} catch(e) {
			dispatch({type: 'GET_LIST_ERROR', payload: e.message})
		}	
	}, []);

	return (
		<ListContext.Provider value={{...state, fetchLists, fetchList}}>
			{children}
		</ListContext.Provider>
	);
};

export default ListContext;
