// providers
import { 
	AuthProvider, 
	NotificationProvider
} from '../app/providers';
// styles
import '../app/styles/global.scss';
// modules
import { Notification } from '../app/components/modules';


export default function App({ Component, pageProps }) {	
	return (
		<AuthProvider>
			<NotificationProvider>
				<Component {...pageProps} />
				<Notification />
			</NotificationProvider>
		</AuthProvider>
	);
};