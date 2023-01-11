import { useEffect, useState } from "react";
import { ConnectError } from "@bufbuild/connect-web";
import { useClient } from "./use-client";
import { User } from "../pb/gen/js/auth_pb";
import { AuthService } from "../pb/gen/js/auth_connectweb";

function App() {
  const authService = useClient(AuthService);

  const [user, setUser] = useState<User>(null!);
  useEffect(() => {
    (async () => {
      try {
        const user = new User({
          username: "admin",
          password: "dts",
        });
        await authService.login(user);
        setUser(user);
        // @ts-ignore
      } catch (err: ConnectError) {
        setUser(null!);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
      {user && <h2>{user.username}</h2>}
    </div>
  );
}

export default App;
