#!/usr/bin/env node

/**
 * Validates staged UI components follow Atomic Design structure
 * Checks ONLY staged files to avoid overwhelming existing components
 * Requirements for newly added/modified components:
 * - If [Component].tsx is staged, should have [Component].test.tsx (for atoms/molecules/organisms)
 * - If [Component].tsx is staged, should have [Component].stories.tsx (for atoms/molecules/organisms)
 * - Should have index.tsx in component folder
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const COMPONENT_TYPES = ['atoms', 'molecules', 'organisms']

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only', {
      encoding: 'utf-8',
    })
    return output.trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

function validateComponentStructure() {
  const stagedFiles = getStagedFiles()
  const componentFiles = stagedFiles.filter(f => f.startsWith('components/ui/'))

  if (componentFiles.length === 0) {
    console.log('✅ No staged component files - skipping structure validation')
    process.exit(0)
  }

  const componentsPath = path.join(process.cwd(), 'components', 'ui')
  let hasErrors = false

  // Extract unique component folders from staged files
  const componentFolders = new Set()
  componentFiles.forEach(file => {
    const parts = file.split('/')
    if (parts.length >= 4) {
      // components/ui/[type]/[component]
      componentFolders.add(file.substring(0, file.lastIndexOf('/')))
    }
  })

  componentFolders.forEach(folderPath => {
    const fullPath = path.join(process.cwd(), folderPath)
    const componentName = path.basename(folderPath)
    const parentDir = path.basename(path.dirname(folderPath))

    if (!COMPONENT_TYPES.includes(parentDir)) return // Skip foundations

    if (!fs.existsSync(fullPath)) return

    const files = fs.readdirSync(fullPath)
    const hasMainFile = files.some(f => f === `${componentName}.tsx`)
    const hasTestFile = files.some(f => f === `${componentName}.test.tsx`)
    const hasStoryFile = files.some(f => f === `${componentName}.stories.tsx`)
    const hasIndexFile = files.some(f => f === 'index.tsx')

    // Only error if the main component file is being added/modified but missing test/story
    const isStagedMainFile = componentFiles.some(f => f.includes(`${componentName}.tsx`) && !f.includes('.test') && !f.includes('.stories'))

    if (isStagedMainFile && !hasTestFile) {
      console.error(
        `❌ ${folderPath}/${componentName}.test.tsx is missing. Tests are required for new UI components.`
      )
      hasErrors = true
    }

    if (isStagedMainFile && !hasStoryFile) {
      console.error(
        `❌ ${folderPath}/${componentName}.stories.tsx is missing. Stories are required for new UI components.`
      )
      hasErrors = true
    }

    if (!hasIndexFile) {
      console.warn(`⚠️  ${folderPath}/index.tsx is missing (optional but recommended)`)
    }
  })

  if (hasErrors) {
    console.error('\n❌ Component structure validation failed')
    console.error('   Make sure new components include:')
    console.error('   - [Component].test.tsx')
    console.error('   - [Component].stories.tsx')
    console.error('   - index.tsx (recommended)\n')
    process.exit(1)
  }

  console.log('✅ Component structure validation passed')
  process.exit(0)
}

validateComponentStructure()
