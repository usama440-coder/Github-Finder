import UserResults from "../components/users/UserResults";
import UserSerach from "../components/users/UserSearch";

function Home() {
    return (
        <div>
            <UserSerach />
            <UserResults />
        </div>
    )
}

export default Home;