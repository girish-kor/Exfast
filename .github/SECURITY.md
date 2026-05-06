# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in exfast, please email security@exfast.io with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

Do NOT open public GitHub issues for security vulnerabilities.

## Security Updates

We commit to:
- Releasing security patches within 48 hours of confirmation
- Notifying users of critical vulnerabilities
- Maintaining backward compatibility in security releases

## Supported Versions

| Version | Status | Support Until |
|---------|--------|----------------|
| 1.x     | Current | December 2025 |
| 0.x     | EOL    | June 2024     |

## Dependency Management

- Dependencies are audited weekly
- We use npm audit to check for vulnerabilities
- Critical issues trigger immediate patches
- All dependencies are kept up-to-date

## Best Practices

- Always use the latest version
- Keep Node.js >= 18.0.0
- Review security advisories regularly
- Use strong API keys and secrets
