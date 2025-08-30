import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setIsLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    // On successful signup, Supabase may require email confirmation. Redirect to home.
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Create an account</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button onClick={handleSignup} disabled={!email || !password || isLoading} className="w-full">
          Create account
        </Button>
      </div>
    </div>
  );
};

export default Signup;
