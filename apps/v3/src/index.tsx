import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';

const App = () => <div>Hello World</div>;

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.querySelector('#app')
);
