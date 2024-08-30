/**
 * @typedef {Object} ITreeNode
 * @property {'file' | 'folder'} type - The type of the node (file or folder).
 * @property {string} name - The name of the node.
 * @property {Date} modified - The last modified date of the node.
 * @property {number} size - The size of the node (in bytes).
 * @property {ITreeNode[]} [children] - The child nodes if the node is a folder.
 */

/** @type {string[]} */
let expandedFolders = []

/**
 * Creates a new element for a node and appends it to the container.
 * @param {HTMLElement} container - The container element where the node will be appended.
 * @param {ITreeNode} node - The node data.
 * @param {string} [activeFolder] - The name of the folder to expand.
 */
function createNodeElement(container, node, activeFolder) {
  const element = document.createElement('div')
  element.classList.add('node')

  if (node.type === 'folder') {
    addFolderIcon(element)
    updateExpandedFolders(activeFolder, true)
  }

  const folderName = document.createElement('span')
  folderName.textContent = node.name
  folderName.addEventListener('click', () => handleNodeClick(node, element))
  element.appendChild(folderName)

  if (node.type === 'folder') {
    folderName.style.cursor = 'pointer'
    const childrenContainer = document.createElement('div')
    childrenContainer.classList.add('children')
    childrenContainer.style.display = expandedFolders.includes(node.name)
      ? 'block'
      : 'none'
    createTree(childrenContainer, node.children || [], activeFolder)
    element.appendChild(childrenContainer)
  }

  container.appendChild(element)
  handleActiveFolder(element, node)
}

/**
 * Handles expanding the active folder.
 * @param {HTMLElement} element - The element representing the folder.
 * @param {ITreeNode} node - The node data.
 * @param {string} [activeFolder] - The name of the folder to expand.
 */
function handleActiveFolder(element, node) {
  if (node.type === 'folder' && expandedFolders.includes(node.name)) {
    const childrenContainer = element.querySelector('.children')
    if (childrenContainer) {
      childrenContainer.style.display = 'block'
    }

    const icon = element.querySelector('.icon')
    if (icon) {
      icon.textContent = '-'
    }
  }
}

/**
 * Adds a folder icon to the element.
 * @param {HTMLElement} element - The element to which the icon will be added.
 */
function addFolderIcon(element) {
  const icon = document.createElement('span')
  icon.classList.add('icon')
  icon.textContent = '+'
  icon.style.cursor = 'pointer'

  icon.addEventListener('click', (e) => {
    e.stopPropagation()
    const childrenContainer = element.querySelector('.children')
    if (childrenContainer) {
      toggleVisibility(childrenContainer)
    }
    toggleIcon(icon)
  })
  element.appendChild(icon)
}

/**
 * Toggles the visibility of an element.
 * @param {HTMLElement} element - The element to toggle.
 */
function toggleVisibility(element) {
  element.style.display = element.style.display === 'none' ? 'block' : 'none'
}

/**
 * Toggles the icon between '+' and '-'.
 * @param {HTMLElement} icon - The icon element to toggle.
 */
function toggleIcon(icon) {
  icon.textContent = icon.textContent === '+' ? '-' : '+'
}

/**
 * Handles click events on a node.
 * @param {ITreeNode} node - The clicked node.
 * @param {HTMLElement} element - The element representing the node.
 */
function handleNodeClick(node, element) {
  if (node.type === 'folder') {
    displayFolderContents(node)
    expandFolder(element)
  }
}

/**
 * Expands a folder and updates the icon.
 * @param {HTMLElement} element - The folder element to expand.
 */
function expandFolder(element) {
  const childrenContainer = element.querySelector('.children')
  if (childrenContainer) {
    childrenContainer.style.display = 'block'
  }

  const icon = element.querySelector('.icon')
  if (icon) {
    icon.textContent = '-'
  }
}

/**
 * Recursively creates the tree structure.
 * @param {HTMLElement} container - The container element where the tree will be created.
 * @param {ITreeNode[]} nodes - The list of nodes to create.
 * @param {string} [activeFolder] - The name of the folder to expand.
 */
function createTree(container, nodes, activeFolder) {
  nodes.forEach((node) => createNodeElement(container, node, activeFolder))
}

/**
 * Displays the contents of the selected folder in the main pane.
 * @param {ITreeNode} folder - The folder to display contents for.
 */
function displayFolderContents(folder) {
  const main = document.getElementById('main')
  main.innerHTML = '' // Clear previous contents

  if (folder.type === 'folder' && folder.children) {
    const table = document.createElement('table')
    table.classList.add('file-table')

    const headerRow = document.createElement('tr')
    headerRow.innerHTML = `<th>Name</th><th>Modified</th><th>Size</th>`
    table.appendChild(headerRow)

    folder.children.forEach((item) => {
      const modifiedDate = new Date(item.modified)

      const row = document.createElement('tr')
      row.classList.add(item.type)

      row.innerHTML = `<td>${item.name}</td>
                       <td>${modifiedDate.toDateString()}</td>
                       <td>${item.size} bytes</td>`

      row.addEventListener('click', () => {
        renderSidebar(item.name)
        if (item.type === 'folder') displayFolderContents(item)
      })

      table.appendChild(row)
    })

    main.appendChild(table)
  }
}

function updateExpandedFolders(folderName, isExpanded) {
  if (isExpanded) {
    if (!expandedFolders.includes(folderName)) {
      expandedFolders.push(folderName)
    }
  } else {
    expandedFolders = expandedFolders.filter((name) => name !== folderName)
  }
}

/**
 * Renders the sidebar with the file system tree.
 * @param {string} activeFolder - The name of the folder to expand.
 */
function renderSidebar(activeFolder) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return

  sidebar.innerHTML = ''
  createTree(sidebar, fileSystem, activeFolder)

  const firstFolder = sidebar.querySelector('.node > .children')
  if (firstFolder) {
    expandFolder(firstFolder.parentElement)
  }
}

function handleFetchError() {
  document.getElementById('error').style.display = 'block'
}

/** @type {ITreeNode[]} */
let fileSystem

/**
 * Initializes the file system explorer UI.
 */
async function init() {
  fileSystem = await fetchFileSystem()
  if (!fileSystem) {
    handleFetchError()
    return
  }
  renderSidebar('')
  displayFolderContents(fileSystem[0]) // Open "Files" folder by default
}

async function fetchFileSystem() {
  try {
    const response = await fetch('http://localhost:3000/api/filesystem')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    fileSystem = await response.json()
    return fileSystem
  } catch (error) {
    console.error('Error fetching file system data:', error)
  }
}

window.onload = init
