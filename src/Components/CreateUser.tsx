import { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createUserThunk, setFormValue } from "../slice";

const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formValue, error, status, createdUsers } = useSelector(
    (state: RootState) => state.user
  );

  const url: string = "https://reqres.in/api/users";
  if (status === "loading") {
    return <div>Loading all Data...</div>;
  }

  if (status === "failed") {
    return <div>Error loading Data: {error}</div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormValue({ [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // dispatch(createNewUser({ ...formValue }));
    dispatch(createUserThunk(url));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValue.name}
          onChange={handleChange}
        />
        <label htmlFor="job">Job: </label>
        <input
          type="text"
          id="job"
          name="job"
          value={formValue.job}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      {createdUsers.length >= 1 &&
        createdUsers.map((user) => (
          <div key={user.id}>
            <p>UserCreated: </p>
            <p>Id: {user.id}</p>
            <p>UserName: {user.name}</p>
            <p>Job: {user.job}</p>
            <p>Created At: {user.createdAt}</p>
          </div>
        ))}
    </>
  );
};

export default CreateUser;
