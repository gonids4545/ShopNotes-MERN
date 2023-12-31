import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { userApiSlice } from "../users/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      userApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    // console.log("subscribing");
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    // const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate());

    // return () => {
    //   console.log("unsubscribing");
    //   notes.unsubscribe();
    //   users.unsubscribe();
    // };
  }, []);

  return <Outlet />;
};
export default Prefetch;
