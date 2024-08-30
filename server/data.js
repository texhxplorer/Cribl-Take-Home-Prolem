const fileSystem = [
  {
    type: 'folder',
    name: 'Files',
    modified: new Date('2023-01-01'),
    size: 0,
    children: [
      {
        type: 'folder',
        name: 'documents',
        modified: new Date('2023-01-02'),
        size: 0,
        children: [
          {
            type: 'folder',
            name: 'inner documents',
            modified: new Date('2023-01-02'),
            size: 0,
            children: [
              {
                type: 'file',
                name: 'inner resume.pdf',
                modified: new Date('2023-02-10'),
                size: 45,
              },
              {
                type: 'file',
                name: 'inner report.docx',
                modified: new Date('2023-03-15'),
                size: 32,
              },
            ],
          },
          {
            type: 'file',
            name: 'notes.txt',
            modified: new Date('2023-08-02'),
            size: 12,
          },
          {
            type: 'file',
            name: 'todo.md',
            modified: new Date('2023-09-07'),
            size: 5,
          },
        ],
      },
      {
        type: 'folder',
        name: 'images',
        modified: new Date('2023-01-03'),
        size: 0,
        children: [
          {
            type: 'file',
            name: 'photo1.png',
            modified: new Date('2023-04-12'),
            size: 120,
          },
          {
            type: 'file',
            name: 'photo2.jpg',
            modified: new Date('2023-05-01'),
            size: 98,
          },
        ],
      },
      {
        type: 'folder',
        name: 'system',
        modified: new Date('2023-01-04'),
        size: 0,
        children: [
          {
            type: 'file',
            name: 'config.sys',
            modified: new Date('2023-06-20'),
            size: 14,
          },
          {
            type: 'file',
            name: 'boot.log',
            modified: new Date('2023-07-11'),
            size: 8,
          },
        ],
      },
      {
        type: 'file',
        name: 'notes.txt',
        modified: new Date('2023-08-02'),
        size: 12,
      },
      {
        type: 'file',
        name: 'todo.md',
        modified: new Date('2023-09-07'),
        size: 5,
      },
    ],
  },
]

module.exports = fileSystem