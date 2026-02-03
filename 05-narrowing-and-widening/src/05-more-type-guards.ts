interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
  lastLogin: Date;
}

interface RegularUser extends User {
  role: "user" | "guest";
  lastActive: Date;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

function isAdmin(user: User): user is Admin {
  return user.role === "admin";
}

function processUser(user: User) {
  if (isAdmin(user)) {
    return user.permissions;
  } else {
    return user.permissions;
  }
}
