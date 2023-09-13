import { createContext } from 'react';
import  useDataFetching  from '../hooks/useDataFetching';

export const ItemsContext = createContext();

export const ItemsContextProvider = ({children}) => {
	const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/GustavoFelixN/PersonalShoppingList/items');

	return (
		<ItemsContext.Provider value={{items: data, error, loading}}>
			{children}
		</ItemsContext.Provider>
	);
};

export default ItemsContext;
