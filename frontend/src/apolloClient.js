import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useSelector } from 'react-redux';

const createApolloClient = () => {
    const jwtToken = useSelector(state => state.auth.jwtToken); // Retrieve JWT token from Redux store

    // Create an HTTP link that includes the JWT token in headers
    const httpLink = new HttpLink({
        uri: 'http://localhost:5000/graphql', // URL to your GraphQL server
        headers: {
            Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
        },
    });

    // Create and configure Apollo Client
    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });

    return client;
};

export default createApolloClient;
