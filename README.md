

Construction field management system for drawings, tasks, RFIs, and reporting
with offline-first mobile workflows and cloud sync.

## Product goal
Enable teams to:
- Control drawings and documents
- Raise tasks with photos/PDF
- Assign users and manage roles
- Create projects and groups
- Work offline and sync to cloud
- Produce reports (PDF/XLS)

## Core modules
### Module A — Project Management
Capabilities:
- Create / rename / archive project
- Invite users to project
- User roles: Admin, Manager, Supervisor, Worker, Viewer, Data

Project data:
- Project name, location, company, start/finish, status
- Members list and permissions

Screens:
- Project list
- Project dashboard
- Members page
- Settings

### Module B — Task System (Heart)
Features:
- Create task linked to drawing location, room/zone, category
- Assign user, priority, and due date

Task content:
- Description, photos, PDF, comments, checklist
- Status workflow with copy code support

Status flow:
Open → In Progress → Ready → Closed → Reopened

Views:
- List
- Kanban
- By drawing
- By assignee
- Calendar

### Module C — Drawings / Plans
Capabilities:
- Upload PDF drawings
- Version control and supersede old revision
- Compare revisions
- Markups: lines, cloud, arrow, text, measurements

Link system:
- Pin task to drawing
- Pin photo to drawing
- RFI to drawing

### Module D — Photos & Media
Capabilities:
- Take photo or pick from gallery
- Auto date/time and EXIF location
- Markup photo
- Attach to project, task, RFI, inspection

### Module E — Document Control
Capabilities:
- Upload PDF, DOC, XLS, ZIP
- Folder structure
- Versioning
- Approvals

### Module F — Forms & Reports
Templates:
- Daily report
- Inspection
- Handover
- Snag list
- Safety

Export:
- PDF
- XLS
- Share link

### Module G — RFIs
Capabilities:
- Create RFI
- Link to plan
- Responsible party
- Due date
- Response thread
- Export log

### Module H — Users & Permissions
Capabilities:
- Companies and groups
- Roles and access per project

### Module I — Offline Engine
Capabilities:
- Local DB
- Queue actions
- Sync service
- Conflict resolver

### Module J — Notifications
Capabilities:
- Task assigned
- Comment
- New drawing
- RFI response

## System architecture
### Tech stack
Mobile:
- Flutter or Kotlin (Android)
- PDF renderer
- SQLite

Backend:
- Firebase or Supabase (auth, storage, realtime DB)

Web:
- React admin portal

### Data structure
USERS:
- id
- name
- email
- role
- company
- projects

PROJECT:
- id
- name
- status
- members
- drawings
- tasks
- rfis
- docs

TASK:
- id
- projectId
- title
- desc
- assignee
- status
- priority
- drawingId
- photos
- comments
- dueDate

DRAWING:
- id
- projectId
- name
- revision
- fileUrl
- markups

PHOTO:
- id
- taskId
- url
- date
- author
- markup

RFI:
- id
- subject
- question
- answer
- status
- linkedDrawing

## API structure
Auth:
- login
- register
- invite

Projects:
- createProject
- updateProject
- addUser
- listProjects

Tasks:
- createTask
- updateStatus
- addPhoto
- comment

Drawings:
- upload
- newRevision
- markupSave

Reports:
- generatePDF
- exportXLS

## UI screens
- Login
- Projects list
- Project dashboard
- Tasks
- Drawing viewer
- Photo capture
- RFIs
- Reports
- Settings

## Next steps
1. Confirm mobile stack choice (Flutter vs Kotlin).
2. Choose backend (Firebase vs Supabase) and define auth model.
3. Define MVP scope and sprint plan.
4. Create repository structure for mobile, backend, and web.
