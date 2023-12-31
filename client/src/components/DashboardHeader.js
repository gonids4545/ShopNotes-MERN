import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/;
const NOTES_REGEX = /^\/dashboard\/notes(\/)?$/;
const USERS_REGEX = /^\/dashboard\/users(\/)?$/;

const DashboardHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate(<Public />);
  //   }
  // }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dashboard/notes/new");
  const onNewUserClicked = () => navigate("/dashboard/users/new");
  const onNotesClicked = () => navigate("/dashboard/notes");
  const onUsersClicked = () => navigate("/dashboard/users");

  let dashClass = null;
  if (
    !DASHBOARD_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className='icon-button'
        title='New Note'
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className='icon-button'
        title='New User'
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dashboard")) {
      userButton = (
        <button className='icon-button' title='Users' onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dashboard")) {
    notesButton = (
      <button className='icon-button' title='Notes' onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const onLogOutButtonClicked = () => {
    sendLogout();
    navigate("/");
  };
  const logoutButton = (
    <button
      className='icon-button'
      title='Logout'
      onClick={onLogOutButtonClicked}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className='dash-header'>
        <div className={`dash-header__container ${dashClass}`}>
          <Link to='/dashboard'>
            <h1 className='dash-header__title'>ShopNotes</h1>
          </Link>
          <nav className='dash-header__nav'>{buttonContent}</nav>
        </div>
      </header>
    </>
  );

  return content;
};
export default DashboardHeader;
