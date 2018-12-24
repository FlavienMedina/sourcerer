import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Pane, Heading, Button } from 'evergreen-ui'

import Home from './pages/Home'
import User from './pages/User'

import './App.css'

// initialize client
const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	request: operation => {
		operation.setContext(context => ({
			headers: {
				...context.headers,
				Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
			}
		}))
	}
})

class App extends Component {
	render() {
		return (
			<Router>
				<>
					<Pane display="flex" padding={16} background="tint2" borderRadius={3}>
						<Pane flex={1} alignItems="center" display="flex">
							<Link to="/" className="App-menu">
								<Heading size={600}>GraphQL Bootstrap</Heading>
							</Link>
						</Pane>
						<Link to="/user" className="App-menu">
							<Button marginRight={16} appearance="primary">
								User
							</Button>
						</Link>
					</Pane>
					<ApolloProvider client={client}>
						<Route exact path="/" component={Home} />
						<Route path="/user" component={User} />
					</ApolloProvider>
				</>
			</Router>
		)
	}
}

export default App
