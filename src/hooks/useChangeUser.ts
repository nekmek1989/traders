import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {useEffect} from "react";
import {useFetch} from "./useFetch.ts";
import Fetch from "../API/fetch.ts";

export const useChangeUser = (...dependence: any) => {
    const user = useSelector((state: RootState) => state.user)

    const [fetchUser] = useFetch(
        async () => {
            await Fetch.changeUser(user)
        }
    )

    useEffect(() => {
        fetchUser()
    }, [...dependence]);
}