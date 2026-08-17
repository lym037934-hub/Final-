export default function Table() {
   const users = [
      { id: 1, name: "John Doe", email: "john@readymadeui.com", title: "Product Designer", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@readymadeui.com", title: "Frontend Engineer", role: "Member" },
      { id: 3, name: "Alex Brown", email: "alex@readymadeui.com", title: "Backend Engineer", role: "Member" },
      { id: 4, name: "Priya Patel", email: "priya@readymadeui.com", title: "Marketing Lead", role: "Manager" },
      { id: 5, name: "Michael Lee", email: "michael@readymadeui.com", title: "QA Engineer", role: "Member" },
      { id: 6, name: "Sara Khan", email: "sara@readymadeui.com", title: "Content Writer", role: "Member" },
      { id: 7, name: "Daniel Wong", email: "daniel@readymadeui.com", title: "DevOps Engineer", role: "Admin" }
   ];

   return (
      <div className="overflow-x-auto px-4 md:px-8 mt-6">
         <table className="w-full max-w-7xl mx-auto">
            <thead className="text-slate-900 dark:text-slate-50 text-left text-sm font-semibold border-b border-slate-300 dark:border-neutral-600 whitespace-nowrap">
               <tr>
                  <th scope="col" className="pl-0 px-3 py-3.5">Name</th>
                  <th scope="col" className="px-3 py-3.5">Email</th>
                  <th scope="col" className="px-3 py-3.5">Title</th>
                  <th scope="col" className="px-3 py-3.5">Role</th>
                  <th scope="col" className="pr-0 px-3 py-3.5">Actions</th>
               </tr>
            </thead>

            <tbody className="text-sm divide-y divide-slate-200 dark:divide-neutral-700">
               {users.map((user) => (
                  <tr key={user.id}>
                     <td className="pl-0 px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">
                        {user.name}
                     </td>
                     <td className="px-3 py-4 text-slate-500 dark:text-slate-400">
                        {user.email}
                     </td>
                     <td className="px-3 py-4 text-slate-500 dark:text-slate-400">
                        {user.title}
                     </td>
                     <td className="px-3 py-4 text-slate-500 dark:text-slate-400">
                        {user.role}
                     </td>
                     <td className="pr-0 px-3 py-4 flex gap-3">
                        <button
                           type="button"
                           className="text-sm text-blue-700 dark:text-blue-500 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                           aria-label={`Edit ${user.name}`}
                        >
                           Edit
                        </button>
                        <button
                           type="button"
                           className="text-sm text-red-700 dark:text-red-500 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                           aria-label={`Delete ${user.name}`}
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}