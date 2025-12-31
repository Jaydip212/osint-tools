# Contributing to OSINT Tool

Thank you for your interest in contributing to the OSINT Tool project!

## Code of Conduct

This project is dedicated to ethical and legal use of OSINT techniques. All contributions must:

- ✅ Respect privacy and legal boundaries
- ✅ Only use publicly available information
- ✅ Include proper source attribution
- ✅ Follow ethical guidelines
- ❌ Never include hacking or unauthorized access methods
- ❌ Never extract passwords or private data
- ❌ Never bypass security measures

## Development Setup

1. Fork the repository
2. Clone your fork
3. Set up development environment (see SETUP.md)
4. Create a feature branch
5. Make your changes
6. Test thoroughly
7. Submit a pull request

## Coding Standards

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions focused and small
- Add error handling

### TypeScript/React (Frontend)
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components modular
- Add proper error boundaries

## Adding New OSINT Modules

When adding a new data source module:

1. Create a new file in `backend/app/services/modules/`
2. Follow the existing module pattern:
   ```python
   async def new_module(query_type: str, query_value: str) -> List[Dict[str, Any]]:
       # Implementation
   ```
3. Add rate limiting
4. Include error handling
5. Add source attribution
6. Update `__init__.py` to export the module
7. Register in `osint_engine.py`

## Testing

- Test all new features
- Test error cases
- Verify rate limiting works
- Ensure no private data is accessed
- Test with various input types

## Documentation

- Update README.md if needed
- Add docstrings to new functions
- Update FEATURES.md for new features
- Include usage examples

## Legal Compliance

All contributions must:
- Only access publicly available data
- Respect robots.txt and terms of service
- Include proper rate limiting
- Not violate any laws or regulations
- Include appropriate disclaimers

## Pull Request Process

1. Ensure all tests pass
2. Update documentation
3. Add clear description of changes
4. Reference any related issues
5. Wait for code review
6. Address review feedback

## Questions?

Open an issue for questions or discussions about contributions.

Thank you for helping make OSINT Tool better while maintaining ethical standards!

