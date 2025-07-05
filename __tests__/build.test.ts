import { execSync } from 'child_process'
import { existsSync } from 'fs'
import * as path from 'path'

describe('Build Test', () => {
  it('should build TypeScript without errors', () => {
    // Run TypeScript compilation
    expect(() => {
      execSync('npm run build', {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'pipe',
      })
    }).not.toThrow()

    // Verify that the output files exist
    const distPath = path.resolve(__dirname, '..', 'dist')
    expect(existsSync(distPath)).toBe(true)

    // Verify key output files exist
    const keyFiles = [
      'index.js',
      'index.d.ts',
      'game.d.ts',
      'board.d.ts',
      'player.d.ts',
    ]

    keyFiles.forEach((file) => {
      const filePath = path.join(distPath, file)
      expect(existsSync(filePath)).toBe(true)
    })
  })

  it('should export types without compilation errors', () => {
    // This test ensures the types can be imported without issues
    expect(() => {
      // Dynamic import to avoid compilation issues during test setup
      const types = require('../src/index')
      expect(types).toBeDefined()
    }).not.toThrow()
  })
})
