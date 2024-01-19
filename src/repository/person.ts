import DataLoader from 'dataloader';

interface Person {
  id: string;
  name: string;
}

const persons: Person[] = [
  { id: "person1", name: "Alice" },
  { id: "person2", name: "Bob" },
  { id: "person3", name: "Charlie" },
  { id: "person4", name: "Dave" },
];

const friendships = [
  { personId: "person1", friendId: "person2" },
  { personId: "person1", friendId: "person3" },
  { personId: "person2", friendId: "person1" },
  { personId: "person3", friendId: "person1" },
];

export class PersonRepository {
  constructor() {}

  private batchFindFriendsByIds = new DataLoader<string, Person[]>(async (personIds) => {
    console.log(`Batch loading ${personIds.length} persons`);
    return personIds
    .map((id) => friendships.filter((fs) => fs.personId === id))
    .map((fss) => fss.map((fs) => persons.find((p) => p.id === fs.friendId)!));
  });

  async findAll(name?: string) {
    return persons
    .filter((p) => name ? p.name.match(name) : true)
  }

  async findFriendsByPerson(person: Person) {
    return this.batchFindFriendsByIds.load(person.id);
  }
}