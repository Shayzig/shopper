export default function Home() {
  return (
    <div className="home-page">
      <h1>Login & Sign up Reference</h1>
      <h1>Update User</h1>
      <p>1. With local storage</p>
      <p>2. With server side (Mongodb)</p>
      <p>3. With error handle from the server (Sign up mode)</p>

      <ol>
        <li>User name is taken</li>
        <li>password length smaller then 6</li>
      </ol>
    </div>
  );
}
