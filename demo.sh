#!/bin/bash

# Demo script for github-action-base-ts - TypeScript GitHub Action template

set -e

echo "=========================================="
echo "  🚀 GitHub Action Base (TypeScript)"
echo "  Production-Ready Action Template"
echo "=========================================="
echo ""

echo "📦 Project Structure:"
if [ -f "package.json" ]; then
    echo "   ✅ TypeScript project detected"
    echo "   • Jest for testing"
    echo "   • ESLint + Prettier for code quality"
    echo "   • Husky for git hooks"
    echo "   • GitHub Actions CI/CD"
else
    echo "   ❌ package.json not found"
fi

echo ""
echo "✨ Template Features:"
echo ""
echo "   🔧 Development Tools"
echo "      • TypeScript with strict mode"
echo "      • Jest test framework"
echo "      • ESLint + Prettier configured"
echo "      • Pre-commit hooks with Husky"
echo "      • Hot reload for development"
echo ""
echo "   🎯 GitHub Actions Integration"
echo "      • action.yml metadata configured"
echo "      • Inputs/outputs defined"
echo "      • Docker support included"
echo "      • CI/CD workflows ready"
echo ""
echo "   📊 Quality Assurance"
echo "      • 95%+ test coverage target"
echo "      • Automated linting"
echo "      • Type checking"
echo "      • Dependency scanning"
echo ""

echo "🧪 Running Tests..."
if [ -d "node_modules" ]; then
    if [ -f "package.json" ]; then
        echo "   Run: npm test"
        echo "   Coverage: npm run test:coverage"
    fi
else
    echo "   ℹ️  Install dependencies: npm install"
fi

echo ""
echo "📝 Usage Example:"
echo ""
echo "   name: Use TypeScript Action"
echo "   on: [push]"
echo "   jobs:"
echo "     test:"
echo "       runs-on: ubuntu-latest"
echo "       steps:"
echo "         - uses: actions/checkout@v3"
echo "         - uses: wesleyscholl/github-action-base-ts@v1"
echo "           with:"
echo "             input-param: 'value'"
echo ""

echo "🛠️  Development Workflow:"
echo ""
echo "   1. Install dependencies:"
echo "      npm install"
echo ""
echo "   2. Run in development mode:"
echo "      npm run dev"
echo ""
echo "   3. Run tests:"
echo "      npm test"
echo ""
echo "   4. Build for production:"
echo "      npm run build"
echo ""
echo "   5. Package for release:"
echo "      npm run package"
echo ""

echo "📊 Template Benefits:"
echo "   • Faster action development (save hours)"
echo "   • Best practices built-in"
echo "   • Type safety with TypeScript"
echo "   • Automated testing & CI/CD"
echo "   • Production-ready from day 1"
echo ""

echo "=========================================="
echo "  Repository: github.com/wesleyscholl/github-action-base-ts"
echo "  Type: Template | Coverage: 95%+ target"
echo "=========================================="
echo ""
