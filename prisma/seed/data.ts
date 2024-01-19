import { Friendship, Person } from "@prisma/client";

export const persons: Person[] = [
  { id: "person1", name: "Alice" },
  { id: "person2", name: "Bob" },
  { id: "person3", name: "Charlie" },
  { id: "person4", name: "Dave" },
];

export const friendships: Friendship[] = [
  { personId: "person1", friendId: "person2" },
  { personId: "person1", friendId: "person3" },
  { personId: "person2", friendId: "person1" },
  { personId: "person3", friendId: "person1" },
];
