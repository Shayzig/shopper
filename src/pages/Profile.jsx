import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user/user-action";

export default function Profile() {
  const loggedinUser = useSelector((state) => state.user.loggedinUser);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);

    // METHOD-#3:.2 Adding the id to the new data
    const updatedUser = {
      ...data,
      _id: loggedinUser._id,
    };

    try {
      dispatch(updateUser(updatedUser));
    } catch (error) {
      console.log(error);
    }
  }

  if (!loggedinUser) return;

  // METHOD-#3:.1 Getting the defualt value from the loggedinUser

  return (
    <div className="profile">
      <h2>{loggedinUser.username}</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Edit you username:</label>
        <input
          type="text"
          name="username"
          id="username"
          defaultValue={loggedinUser.username}
        />
        <button>Save</button>
      </form>
    </div>
  );
}
