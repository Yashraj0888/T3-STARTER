import Head from "next/head";
import { TaskForm } from "~/components/TaskForm";
import { TaskList } from "~/components/TaskList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="T3 Stack Task Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-3xl p-4">
        <h1 className="mb-8 text-center text-3xl font-bold">Task Manager</h1>
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Add New Task</h2>
            <TaskForm />
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Your Tasks</h2>
            <TaskList />
          </div>
        </div>
      </main>
    </>
  );
} 