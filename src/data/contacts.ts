// Contact data for the application

export interface Contact {
  name: string;
  status: string;
  avatar: string;
}

const contacts: Contact[] = [
  { name: 'Sarah Wilson', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson' },
  { name: 'John Doe', status: 'online', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
  { name: 'Michael Scott', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Michael+Scott' },
  { name: 'Pam Beesly', status: 'offline', avatar: 'https://ui-avatars.com/api/?name=Pam+Beesly' },
  { name: 'Jim Halpert', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Jim+Halpert' },
  { name: 'Dwight Schrute', status: 'offline', avatar: 'https://ui-avatars.com/api/?name=Dwight+Schrute' },
  { name: 'Angela Martin', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Angela+Martin' },
  { name: 'Oscar Martinez', status: 'offline', avatar: 'https://ui-avatars.com/api/?name=Oscar+Martinez' },
  { name: 'Stanley Hudson', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Stanley+Hudson' },
  { name: 'Phyllis Vance', status: 'offline', avatar: 'https://ui-avatars.com/api/?name=Phyllis+Vance' },
];

export default contacts;