import { Button, TextInput } from "flowbite-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  console.log(email, password, confirmPassword)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    try {
      const responce = await fetch("https://ten-fashion.onrender.com/api/auth/signup", {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      })
      if (!responce.ok) {
        throw new Error("failed to signup user")
      }

      const data = await responce.json()
      if (data.success === false) {
        return toast.error(data.message)
      }

      toast.success(data.message)
      navigate("/login")
    } catch (error) {
      throw new Error(error)
    }

    console.log("Signing up with details:", { email, password })
    setError("")
  }

  return (
    <form className="flex max-w-md flex-col gap-4 my-[3%]" onSubmit={handleSubmit}>
      {/* Email Field */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="email"
          className="w-24 text-sm font-medium dark:text-white"
        >
          Email:
        </label>
        <TextInput
          name="email"
          type="email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value)
          }}
          placeholder="johndoe@gmail.com"
          required
          shadow
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
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
          shadow
          placeholder="johndoe@123"
          className="flex-1"
        />
      </div>

      {/* Confirm Password Field */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="repeat-password"
          className="w-24 text-sm font-medium dark:text-white"
        >
          Confirm:
        </label>
        <TextInput
          id="repeat-password"
          type="password"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          required
          shadow
          placeholder="johndoe@123"
          className="flex-1"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      {/* Submit Button */}
      <Button type="submit">Create new account</Button>
    </form>
  )
}

export default SignupForm
