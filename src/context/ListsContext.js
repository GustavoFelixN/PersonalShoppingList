import { createContext } from 'react';
import useDataFetching from '../hooks/useDataFetching';

export const ListContext = createContext();

export const ListContextProvider = ({children}) => {
	const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/GustavoFelixN/PersonalShoppingList/lists');

	return (
		<ListContext.Provider value={{lists: data, loading, error}}>
			{children}
		</ListContext.Provider>
	);
};

export default ListContext;
