import { ListContextProvider } from './ListsContext';
import { ItemsContextProvider } from './ItemsContext';

const AppContext = ({children}) => {
	return (
		<ListContextProvider>
			<ItemsContextProvider>
				{children}
			</ItemsContextProvider>
		</ListContextProvider>
	);
};

export default AppContext;
