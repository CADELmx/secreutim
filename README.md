![GPD utim](/public/social_preview.jpg)
<h1 align="center">
  Gestión de Plantillas Docentes (GPD)
</h1>
This is a web app designed to solve the inefficiency problem in the [UTIM](http://www.utim.edu.mx/) for assignement of workload

the app has two basic routes /index and /secretary, the first one is for workload assignement and the second one is for aproving the workload,
the UI is based on the UTIM colors and uses NEXUI with Tailwind CSS to create an friendly UI

Running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Basic setup
- Database driver: [Supabase](https://supabase.com/)
- Realtime events: [Socket.io](https://socket.io/)
- State management: [React Context API](https://react.dev/reference/react/useContext)
- Toast notifications: [React Hot Toast](https://react-hot-toast.com/docs)
- Icons: [Heroicons](https://heroicons.com/)
