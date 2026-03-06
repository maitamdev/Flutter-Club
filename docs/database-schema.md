# Database Schema (Firestore)

## Collections

### users
- uid (string) - Firebase Auth UID
- name (string) - Ho ten
- studentId (string) - Ma so sinh vien
- email (string)
- role (admin | trainer | member)
- status (active | pending | blocked)
- photoURL (string, optional)
- phone (string, optional)
- address (string, optional)
- createdAt (timestamp)

### sessions
- id (auto)
- title (string)
- description (string)
- location (string, optional)
- startsAt (timestamp)
- endsAt (timestamp)
- trainerId (string)
- trainerName (string)
- materials (array of {title, url})
- createdAt (timestamp)

### assignments
- id (auto)
- title (string)
- description (string)
- dueAt (timestamp)
- rubric (array of {criteria, maxPoints})
- createdBy (string)
- createdAt (timestamp)

### quizzes
- id (auto)
- sessionId (string)
- title (string)
- questions (array of {id, question, options, correctIndex})
- duration (number, minutes)
- isActive (boolean)
- startsAt, endsAt (timestamp)
- createdBy (string)
- createdAt (timestamp)

### announcements
- id (auto)
- title (string)
- content (string)
- createdBy (string)
- createdAt (timestamp)
