import contacts from '@/data/contacts';

function getRandomBirthdayForContact(contactName: string) {
  // Use a seeded pseudo-random generator for consistent birthdays per contact
  let hash = 0;
  for (let i = 0; i < contactName.length; i++) {
    hash = contactName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const year = new Date().getFullYear();
  const month = Math.abs(hash) % 12;
  const day = (Math.abs(hash * 31) % 28) + 1;
  const date = new Date(year, month, day);
  return date;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Precompute birthdays for all contacts
const contactsWithBirthdays = contacts.map(contact => {
  const birthday = getRandomBirthdayForContact(contact.name);
  return { ...contact, birthday };
});

// Group contacts by month
const birthdaysByMonth: { [month: number]: typeof contactsWithBirthdays } = {};
contactsWithBirthdays.forEach(contact => {
  const month = contact.birthday.getMonth();
  if (!birthdaysByMonth[month]) birthdaysByMonth[month] = [];
  birthdaysByMonth[month].push(contact);
});

export default function EventsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {MONTHS.map((monthName, monthIdx) =>
        birthdaysByMonth[monthIdx] ? (
          <div key={monthName} className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">{monthName}</h2>
            <ul className="space-y-4">
              {birthdaysByMonth[monthIdx].map((contact, idx) => (
                <li key={idx} className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{contact.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Birthday: {contact.birthday.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
} 