import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/useContext.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, loading, setLoading, error, setError } =
    useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responce = await fetch("https://ten-fashion.onrender.com/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!responce.ok) {
        throw new Error("failed to sign in User");
      }
      const data = await responce.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return toast.error(data.message);
      }
      setLoading(false);
      setError(null);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 my-[4%]"
      onSubmit={handleSubmit}
    >
      {/* Email Field */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="email"
          className="w-24 text-sm font-medium dark:text-white"
        >
          Email:
        </label>
        <TextInput
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Password Field */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="password"
          className="w-24 text-sm font-medium dark:text-white"
        >
          Password:
        </label>
        <TextInput
          id="password"
          type="password"
          placeholder="johndoe@123"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-center gap-2">
        <Checkbox
          id="remember"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      {/* Submit Button */}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LoginForm;
