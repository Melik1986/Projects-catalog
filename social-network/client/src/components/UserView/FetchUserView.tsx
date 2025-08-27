import {useQuery} from "@tanstack/react-query";
import {FC} from "react";
import {fetchUser} from "../../api/User";
import {Loader} from "../Loader";
import {UserView} from "./UserView";

interface FetchUserViewProps {
  userId: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({userId}) => {
  const query = useQuery({
    queryFn: () => fetchUser(userId),
    queryKey: ['users', userId],
  });

  switch (query.status) {
    case 'pending':
      return <Loader />;
    case 'success':
      return <UserView user={query.data} />;
    case 'error':
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => query.refetch()}>Повторить</button>
        </div>
      );
    default:
      return null;
  }
};