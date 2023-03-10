const data = [
   {
      id: 1,
      type: 'todo',
      title: 'Test todo',
      tasks: [
         {id: 1, task: 'Test task1'},
         {id: 2, task: 'Test task2'},
         {id: 3, task: 'Test task3'},
      ],
   },
   {
      id: 2,
      type: 'note',
      title: 'Test note',
      desc: 'this is todo note',
   },
];

export function getToDo() {
   return data;
}
