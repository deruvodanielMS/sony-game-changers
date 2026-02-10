#!/usr/bin/env node

/**
 * Validates that staged UI components don't have hardcoded user-facing strings
 * Focuses on user-visible content, not technical labels/ARIA attributes
 * Checks for: button text, labels (except aria-label), placeholders in actual components
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function getStagedComponentFiles() {
  try {
    const output = execSync('git diff --cached --name-only', {
      encoding: 'utf-8',
    })
    return output
      .trim()
      .split('\n')
      .filter(
        (f) =>
          f.startsWith('components/') &&
          f.endsWith('.tsx') &&
          !f.includes('.test.') &&
          !f.includes('.stories.'),
      )
  } catch {
    return []
  }
}

function validateFile(filePath) {
  if (!fs.existsSync(filePath)) return []

  const content = fs.readFileSync(filePath, 'utf-8')
  const issues = []
  const lines = content.split('\n')

  lines.forEach((line, lineNum) => {
    // Skip lines with translations
    if (line.includes("t('") || line.includes('t("')) return

    // Skip ARIA labels (technical, not user-facing)
    if (line.includes('aria-label=')) return

    // Skip comments and examples in stories
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return

    // Check for hardcoded button/label text content in JSX
    // <Button>Save</Button> pattern
    const jsxContentMatch = line.match(
      /<(Button|Label|Heading|Title|h[1-6])[^>]*>([A-Z][a-zA-Z\s]+)<\//,
    )
    if (jsxContentMatch && !line.includes('{')) {
      const text = jsxContentMatch[2]
      if (text.length > 2 && !['Yes', 'No', 'OK', 'Cancel', 'Close'].includes(text)) {
        issues.push({
          file: filePath,
          line: lineNum + 1,
          message: `Hardcoded component text: <${jsxContentMatch[1]}>${text}</>. Should use i18n.`,
        })
      }
    }

    // Check for hardcoded placeholder (but not in examples)
    if (line.includes('placeholder=') && !line.includes('{')) {
      const match = line.match(/placeholder=["']([^"']+)["']/)
      if (match && match[1].length > 3 && !match[1].includes('e.g.')) {
        issues.push({
          file: filePath,
          line: lineNum + 1,
          message: `Hardcoded placeholder: "${match[1]}". Use dynamic translation.`,
        })
      }
    }
  })

  return issues
}

function main() {
  const stagedFiles = getStagedComponentFiles()

  if (stagedFiles.length === 0) {
    console.log('✅ No staged component files - skipping i18n validation')
    process.exit(0)
  }

  let totalIssues = 0
  const allIssues = []

  stagedFiles.forEach((file) => {
    const fullPath = path.resolve(file)
    const issues = validateFile(fullPath)
    allIssues.push(...issues)
    totalIssues += issues.length
  })

  if (totalIssues > 0) {
    console.error('\n❌ i18n Validation Failed\n')
    allIssues.forEach((issue) => {
      console.error(`  ${issue.file}:${issue.line}`)
      console.error(`     ${issue.message}\n`)
    })
    process.exit(1)
  }

  console.log('✅ i18n validation passed')
  process.exit(0)
}

main()
