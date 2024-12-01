import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface UserProfile {
  username: string;
  email: string;
  password: string;
}

const ProfileSection: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [error, setError] = useState("");

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      editedUser.username.trim() === "" ||
      editedUser.email.trim() === "" ||
      editedUser.password.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }
    setUser(editedUser);
    setIsEditing(false);
    setError("");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={editedUser.username}
              onChange={handleEditChange}
              className="rounded-[5px] w-full bg-white"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={editedUser.email}
              onChange={handleEditChange}
              className="rounded-[5px] w-full bg-white"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={editedUser.password}
              onChange={handleEditChange}
              className="rounded-[5px] w-full bg-white"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="rounded-[5px]"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="rounded-[5px]"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Password:</strong> {"************"}
          </div>
          <Button
            variant="outline"
            className="rounded-[5px]"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
