// import { useSelector } from "react-redux";
// import { selectAllUsers } from "../users/userApiSlice";
import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/userApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const NewNote = () => {
  useTitle("ShopNotes: New Note");

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#001c30"} />;

  const content = <NewNoteForm users={users} />;

  return content;
  // const users = useSelector(selectAllUsers);

  // if (!users?.length) return <p>Not Currently Available</p>;

  // const content = <NewNoteForm users={users} />;

  // return content;
};
export default NewNote;
