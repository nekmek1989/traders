import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../useFetch.ts";
import Fetch from "../../API/fetch.ts";
import {recordUser, User} from "../../store/userReducer.ts";

export const useChangeUser: hookChangeUser = (...dependence) => {
    const user = useSelector((state: RootState) => state.user)
    const [tempUser, setTempUser] = useState<User>()
    const [isSuccessRecord, setIsSuccessRecord] = useState(0)

    const [fetchUser, error] = useFetch(
        async () => {
            await Fetch.changeUser(user)
            setIsSuccessRecord(isSuccessRecord + 1)

        }
    )

    useEffect(() => {
        fetchUser()
    }, [...dependence]);

    useEffect(() => {
        setTempUser(user)
    }, [isSuccessRecord]);

    useEffect(() => {
        if (error && tempUser) {
            store.dispatch(recordUser(tempUser))
        }
    }, [error]);

    return error
}