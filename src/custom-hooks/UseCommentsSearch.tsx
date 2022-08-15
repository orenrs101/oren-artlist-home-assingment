import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import { FETCH_COMMENTS_LIMIT } from "../entities/consts";
import { IComment } from "../entities/models";

export default function useCommentsSearch(pageNumber = 1) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel:Canceler;

        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/comments",
            params: {_page: pageNumber, _limit: FETCH_COMMENTS_LIMIT},
            cancelToken: new axios.CancelToken((c) => (cancel = c))
        }).
        then((response) => {
            setComments((prevComments) => {
                return [...prevComments, ...response.data]
            });
            setHasMore(response.data.length > 0);
            setLoading(false);
        }).
        catch((err) => {
            if(axios.isCancel(err)) return;
            setError(true);
        });

        //cancels the request every single time it recalls the useEffect
        return () => cancel();
    }, [pageNumber]);

    return { loading, error, comments, hasMore };
}