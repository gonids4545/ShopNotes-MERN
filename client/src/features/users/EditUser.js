import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
// import { useSelector } from "react-redux";
// import { selectUserById } from "./userApiSlice";

import { useGetUsersQuery } from "./userApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const EditUser = () => {
  const { id } = useParams();

  // const user = useSelector((state) => selectUserById(state, id));
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color={"#001c30"} />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
