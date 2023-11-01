import { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContext(props) {
    const [accountState, setAccountState] = useState({ id: 0, accountName: "", accountTypeId: "1", currencyTypeId: "1", sumToPass: 0 });
    const [userState, setUserState] = useState({  accountId: 0,firstName: "", lastName: "", tz: "", gender:"0", dateOfBirth: {} });
    const [userListState, setUserListState] = useState([])
    const [accountListState, setAccountListState] = useState([])
    const [currentAccountIdState, setCurrentAccountIdState] = useState(0)
    const [currentUserOfAccountIdState, setCurrentUserOfAccountIdState] = useState(0)

    return (
        <userContext.Provider value={{
            setAccountListState, accountListState, setUserListState, userListState, setAccountState, accountState
            , setCurrentAccountIdState, currentAccountIdState, userState, setUserState, setCurrentUserOfAccountIdState, currentUserOfAccountIdState
        }}>
            {props.children}
        </userContext.Provider>
    )
}