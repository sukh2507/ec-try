import { useEffect, useState } from "react";

import useUser from "@/context/User/UserHook";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle } from "lucide-react";
import PwdInput from "@/components/PwdInput";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [match, setMatch] = useState(0);
  const [role, setRole] = useState("student");
  const [stream, setStream] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const axios = useAxios();

  const roleStreams = {
    teacher: ["Commerce", "Humanities", "Sciences"],
    student: ["Commerce", "Humanities", "Sciences"],
  };

  const streamSubjects = {
    teacher: {
      Commerce: ["Economics", "Business Studies", "Accountancy"],
      Humanities: ["History", "Geography", "Psychology"],
      Sciences: ["Physics", "Chemistry", "Biology"],
    },
    student: {
      Commerce: ["CUET"],
      Humanities: ["CUET"],
      Sciences: ["JEE", "NEET", "CUET"],
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pwd && confirmPwd) {
        setMatch(pwd === confirmPwd && pwd.length >= 4 ? 1 : 2);
      } else {
        setMatch(0);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [pwd, confirmPwd]);

  const toggleSubject = (subject) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      match === 2 ||
      match === 0 ||
      !stream ||
      subjects.length === 0
    ) {
      alert("Please fill all fields correctly!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/register", {
        name,
        email,
        phone,
        password: pwd,
        role,
        stream,
        subjects,
      });
      navigate("/home");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="signup">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Sign Up to get started. To verify your account, we will send a
            6-digit code to you.
          </CardDescription>
        </CardHeader>
        <form id="signup" onSubmit={handleRegister}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Batman"
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="words"
                value={name}
                required
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="moeezali2375@gmail.com"
                autoCorrect="off"
                spellCheck="false"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="03XXXXXXXXX"
                autoCorrect="off"
                spellCheck="false"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setStream("");
                  setSubjects([]);
                }}
                className="w-full border rounded px-2 py-1"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="stream">Stream</Label>
              <select
                id="stream"
                value={stream}
                onChange={(e) => {
                  setStream(e.target.value);
                  setSubjects([]);
                }}
                className="w-full border rounded px-2 py-1"
              >
                <option value="" disabled>
                  Select a stream
                </option>
                {roleStreams[role].map((streamOption) => (
                  <option key={streamOption} value={streamOption}>
                    {streamOption}
                  </option>
                ))}
              </select>
            </div>
            {stream && (
              <div className="space-y-1">
                <Label>Subjects</Label>
                {streamSubjects[role][stream].map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={subjects.includes(subject)}
                      onCheckedChange={() => toggleSubject(subject)}
                    />
                    <Label htmlFor={subject}>{subject}</Label>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-1">
              <PwdInput
                id="pwd"
                name="Password"
                pwd={pwd}
                setPwd={setPwd}
                match={match}
              />
            </div>
            <div className="space-y-1">
              <PwdInput
                id="confirmPwd"
                name="Confirm Password"
                pwd={confirmPwd}
                setPwd={setConfirmPwd}
                match={match}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" disabled={isLoading} className="w-full">
              {isLoading ? <LoaderCircle className="spinner" /> : "Sign Up!"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default Signup;
