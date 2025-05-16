# Frontend of my Tasks app

### Hosted currently at vercel.com - https://tasks-frontend-taupe.vercel.app/

Backend Repo - https://github.com/ShubhSarin/tasksBackend

I learned React.js framework, react-router and tailwind CSS while building this app.

### I implemented the following things:

- A landing page which leads to Register and Login pages
- If the user is already logged in, login and register pages will be skipped and user will be directed to tasks page
- tasks page will fetch all the tasks of a user and show it. It also contains options to logout and create a new task
- Each task card contains buttons to edit and delete a task
- Clicking edit button will lead to a separate edit task page which has task title and description as input field. Saving the updated task till reflect the changes on tasks page and also update the "Updated at" time of the task.
- Deleting a task will remove it from database and it will fetch the tasks again to update the tasks page.