type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "teacher" | "student";
  isVerified: number;
  token: string;
};

export default User;
