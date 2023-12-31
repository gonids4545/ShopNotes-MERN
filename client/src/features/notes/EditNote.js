import { useParams } from "react-router-dom";
//import { useSelector } from "react-redux";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/userApiSlice";
import EditNoteForm from "./EditNoteForm";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  useTitle("ShopNotes: Edit Note");
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={"#001c30"} />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className='errmsg'>No access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
