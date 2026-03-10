import { useState } from "react";
import loginBg from "@/assets/login-bg6.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit handling
    console.log({ username, password });
  };

  return (
    <section
      className="min-h-screen bg-background pt-24 pb-16"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 80%',
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
        <div className="w-full max-w-md rounded-2xl border p-6 shadow-2xl mt-10 md:mt-16 backdrop-blur-lg" style={{ backgroundColor: '#F3F3F3', borderColor: '#D2DEF9', marginRight: '0.5in', boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
          <h1 className="text-2xl font-bold mb-6 text-center text-[#010101]">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#010101] mb-1">
              User Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 text-[#010101] placeholder:text-[#010101]/70"
              style={{ borderColor: '#D2DEF9', backgroundColor: '#FFFFFF', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.2)' }}
              placeholder="Enter user name"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#010101] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70 text-[#010101] placeholder:text-[#010101]/70"
              style={{ borderColor: '#D2DEF9', backgroundColor: '#FFFFFF', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.2)' }}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="rounded-md bg-[#0068B3] px-4 py-2 text-white hover:bg-[#045a98]">
              Login
            </button>
            <button type="button" className="text-[#010101] hover:underline">
              Forgot Password?
            </button>
          </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;