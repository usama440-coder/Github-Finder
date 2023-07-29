import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const searchRepos = async (repo) => {
        setLoading();
        const response = await fetch(`https://api.github.com/users/${repo}/repos`);
        const data = await response.json();
        // console.log(data)

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text
        });
        const response = await fetch(`https://api.github.com/search/users?${params}`);
        const { items } = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })

        // setUsers(data);
        // setLoading(false);
    }

    const searchUser = async (login) => {
        setLoading();

        const response = await fetch(`https://api.github.com/users/${login}`);

        if (response.status === 404) {
            window.location('/notfound');
        }
        else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data,
            });
        }
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USER',
        });
    }

    const setLoading = () => {
        return dispatch({ type: 'SET_LOADING' });
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        searchUser,
        searchRepos,
        clearUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;