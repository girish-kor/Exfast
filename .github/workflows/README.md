# GitHub Actions Setup Guide

## Required Secrets

Configure these secrets in your GitHub repository settings:

### NPM_TOKEN
- **Purpose**: Authenticate npm publishing
- **How to get**:
  1. Go to npmjs.com
  2. Login to your account
  3. Go to Access Tokens → Generate New Token
  4. Select "Automation" type
  5. Copy token
  6. Add to GitHub Secrets as `NPM_TOKEN`

### CODECOV_TOKEN
- **Purpose**: Upload coverage reports to Codecov
- **How to get**:
  1. Go to codecov.io
  2. Sign in with GitHub
  3. Add your repository
  4. Copy the repository token
  5. Add to GitHub Secrets as `CODECOV_TOKEN`

### SNYK_TOKEN (Optional)
- **Purpose**: Run Snyk security scans
- **How to get**:
  1. Go to snyk.io
  2. Sign in with GitHub
  3. Go to Account Settings → API Token
  4. Copy token
  5. Add to GitHub Secrets as `SNYK_TOKEN`

## Workflows

### CI Workflow (ci.yml)
Runs on every push and pull request to main/develop:
- Tests on Node.js 18, 20, 22
- Runs linter (ESLint)
- Runs tests with coverage
- Uploads coverage to Codecov
- Security audit
- Format check

**Trigger**: Push to main/develop, PR to main/develop

### Publish Workflow (publish.yml)
Publishes to npm on release:
- Runs full test suite
- Verifies package integrity
- Publishes to npm registry
- Success notification

**Trigger**: GitHub Release created, manual workflow dispatch

### Security Workflow (security.yml)
Weekly security scanning:
- npm audit for dependencies
- Snyk vulnerability scanning
- CodeQL code analysis
- SBOM generation

**Trigger**: Push to main/develop, weekly schedule (Sunday 2 AM UTC), manual

### Coverage Workflow (coverage.yml)
Test coverage reporting:
- Generates coverage report
- Uploads to Codecov
- Comments on PRs with coverage changes

**Trigger**: Push to main/develop, PR to main/develop

### Release Workflow (release.yml)
Manual release creation:
- Bumps version (patch/minor/major/prerelease)
- Updates CHANGELOG
- Creates git tag
- Pushes tag to repository
- Creates GitHub Release

**Trigger**: Manual workflow dispatch

## Version Matrix

Tests run against:
- Node.js 18.x (LTS)
- Node.js 20.x (LTS)
- Node.js 22.x (Current)

## Coverage Requirements

- Minimum coverage: 80%
- All new code must include tests
- PRs fail if coverage drops

## Release Process

1. Go to Actions → Release
2. Click "Run workflow"
3. Select release type (patch/minor/major)
4. Click "Run workflow"
5. Workflow automatically:
   - Bumps version in package.json
   - Updates CHANGELOG
   - Creates git tag
   - Publishes to npm (via publish workflow)
   - Creates GitHub Release

## Monitoring

- Check Actions tab for workflow status
- Review Coverage tab for coverage trends
- Monitor Security tab for vulnerability alerts
- Check Releases page for published versions

## Local Testing Before Release

```bash
npm test
npm run lint
npm run format:check
npm run test:cov
npm pack --dry-run
```
