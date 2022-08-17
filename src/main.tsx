import { render } from 'solid-js/web';
import App from './App';

import './styles/global.css';
import './styles/app.css';

render(() => <App />, document.getElementById('root') as HTMLElement);
