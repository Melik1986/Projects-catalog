import {useQuery} from "@tanstack/react-query";
import {fetchMe} from "../../api/User.ts";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {PostForm} from "../PostForm";

export const Account = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", 'me'],
    }
  );
  switch (meQuery.status) {
    case 'pending':
      return <Loader />;

    case "error":
      return <AuthForm />;

    case "success":
      return <PostForm />;
  }
};