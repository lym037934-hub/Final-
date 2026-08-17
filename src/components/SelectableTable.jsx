import React, { useState } from 'react';

export default function SelectableTable() {
   // 1. Data Source
   const users = [
      { id: 1, name: "John Doe", email: "john@readymadeui.com", title: "Product Designer", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@readymadeui.com", title: "Frontend Engineer", role: "Member" },
      { id: 3, name: "Alex Brown", email: "alex@readymadeui.com", title: "Backend Engineer", role: "Member" },
      { id: 4, name: "Priya Patel", email: "priya@readymadeui.com", title: "Marketing Lead", role: "Manager" },
      { id: 5, name: "Michael Lee", email: "michael@readymadeui.com", title: "QA Engineer", role: "Member" },
      { id: 6, name: "Sara Khan", email: "sara@readymadeui.com", title: "Content Writer", role: "Member" },
      { id: 7, name: "Daniel Wong", email: "daniel@readymadeui.com", title: "DevOps Engineer", role: "Admin" }
   ];

   // 2. State for Selection
   const [selectedIds, setSelectedIds] = useState([]);

   // 3. Logic Handlers
   const isAllSelected = users.length > 0 && selectedIds.length === users.length;

   const toggleSelectAll = () => {
      if (isAllSelected) {
         setSelectedIds([]);
      } else {
         setSelectedIds(users.map(user => user.id));
      }
   };

   const toggleRow = (id) => {
      setSelectedIds(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
   };

   // Reusable Components to keep JSX clean
   const Checkbox = ({ checked, onChange, ariaLabel }) => (
      <label className="group inline-block">
         <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onChange}
            aria-label={ariaLabel}
         />
         <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 
        ${checked
               ? 'bg-blue-600 outline-blue-600'
               : 'bg-white dark:bg-neutral-800 outline-slate-300 dark:outline-neutral-700'} 
        group-focus-within:outline-2 group-focus-within:outline-blue-600 transition-colors`}>
            <svg className={`size-3 text-white ${checked ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M1 5l3 3 7-7" />
            </svg>
         </span>
      </label>
   );

   return (
      <div className="overflow-x-auto px-4 md:px-8 mt-6">
         <table className="w-full max-w-7xl mx-auto">
            <thead className="text-slate-900 dark:text-slate-50 text-left text-sm font-semibold border-b border-slate-300 dark:border-neutral-600 whitespace-nowrap">
               <tr>
                  <th scope="col" className="w-8 pl-3 py-3.5">
                     <Checkbox
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        ariaLabel="Select all rows"
                     />
                  </th>
                  <th scope="col" className="px-3 py-3.5">Name</th>
                  <th scope="col" className="px-3 py-3.5">Email</th>
                  <th scope="col" className="px-3 py-3.5">Job title</th>
                  <th scope="col" className="px-3 py-3.5">Role</th>
                  <th scope="col" className="px-3 py-3.5 text-right">Actions</th>
               </tr>
            </thead>

            <tbody className="text-sm divide-y divide-slate-200 dark:divide-neutral-700">
               {users.map((user) => {
                  const isRowSelected = selectedIds.includes(user.id);
                  return (
                     <tr
                        key={user.id}
                        className={`transition-colors ${isRowSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                     >
                        <td className="w-8 pl-3 py-4">
                           <Checkbox
                              checked={isRowSelected}
                              onChange={() => toggleRow(user.id)}
                              ariaLabel={`Select ${user.name}`}
                           />
                        </td>
                        <td className="px-3 py-4 font-medium text-slate-900 dark:text-slate-50 whitespace-nowrap">
                           {user.name}
                        </td>
                        <td className="px-3 py-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                        <td className="px-3 py-4 text-slate-500 dark:text-slate-400">{user.title}</td>
                        <td className="px-3 py-4 text-slate-500 dark:text-slate-400">{user.role}</td>
                        <td className="px-3 py-4 flex justify-end gap-3">
                           <button className="text-blue-700 dark:text-blue-500 hover:underline">Edit</button>
                           <button className="text-red-700 dark:text-red-500 hover:underline">Delete</button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}