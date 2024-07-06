import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  return (
    <div className="row justify-content-around mt-5 user-info">
      <div className="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{user.name}</p>

        <h4>Email Address</h4>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
